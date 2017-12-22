import React from 'react';
import ReactDOM from 'react-dom';
import {doAjax, checkIsAuthenticated, doAuthenticatedAjax, appendQueryString, getQueryParam, doAuthenticatedMultipartRequest,addMetaTags} from '../utils/utils';
import {observer} from "mobx-react";
import Metadata from '../stores/Metadata';
import EntryStep from '../steps/EntryStep';
import AgentsStep from '../steps/AgentsStep';
import OrgsStep from '../steps/OrgsStep';
import MetadataPanel from '../steps/MetadataPanel';
import DOIPanel from '../steps/DOIPanel';
import SupplementalInfoStep from '../steps/SupplementalInfoStep';
import ContributorsStep from '../steps/ContributorsStep';
import AccessStep from '../steps/AccessStep';
import RecipientStep from '../steps/RecipientStep';
import ConfirmStep from '../steps/ConfirmStep';
import RIsStep from '../steps/RIsStep';
import {PanelGroup, Panel} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
/*import css from '../css/main.css';*/
import MessageBoxModal from '../fragments/MessageBoxModal';

const metadata = new Metadata();

let publishSteps = [];
let submitSteps = [];

@observer
export default class DOECodeWizard extends React.Component {
constructor(props) {
    super(props);

    this.parseAutopopulateResponse = this.parseAutopopulateResponse.bind(this);
    this.parseSaveResponse = this.parseSaveResponse.bind(this);
    this.parsePublishResponse = this.parsePublishResponse.bind(this);
    this.parseSubmitResponse = this.parseSubmitResponse.bind(this);
    this.autopopulate = this.autopopulate.bind(this);
    this.save = this.save.bind(this);
    this.publish = this.publish.bind(this);
    this.submit = this.submit.bind(this);
    this.approve = this.approve.bind(this);
    this.exitModalCallback = this.exitModalCallback.bind(this);
    this.doMultipartSubmission = this.doMultipartSubmission.bind(this);
    this.parseReceiveResponse = this.parseReceiveResponse.bind(this);
    this.parseErrorResponse = this.parseErrorResponse.bind(this);
    this.setActivePanel = this.setActivePanel.bind(this);
    this.buildPanel = this.buildPanel.bind(this);
    this.showAdditionalFields = this.showAdditionalFields.bind(this);
    this.panelSelect = this.panelSelect.bind(this);

    this.state = {
        showModal: false,
        modalTitle: null,
        modalMessage: null,
        isError: false,
        "published": false,
        "showAll": false,
        "activePanel": 1,
        "activePanels" : [true,true,true,true,true,true,true,true,true],
        "workflowStatus": ""
    };

    publishSteps = [
        {
            name: 'Repository Information',
            component: <EntryStep metadata={metadata} autopopulate={this.autopopulate} page={this.props.page}/>
        }, {
            name: 'Product Description',
            component: <MetadataPanel metadata={metadata}/>
        }, {
            name: 'Developers',
            component: <AgentsStep/>
        }, {
            name: 'DOI and Release Date',
            component: <DOIPanel metadata={metadata}/>
        }
    ];

    submitSteps = [
        {
            name: 'Supplemental Product Information',
            component: <SupplementalInfoStep page={this.props.page}/>
        }, {
            name: 'Organizations',
            component: <OrgsStep/>
        }, {
            name: 'Contributors and Contributing Organizations',
            component: <ContributorsStep/>
        }, {
            name: 'Identifiers',
            component: <RIsStep/>
        }, {
            name: 'Contact Information',
            component: <RecipientStep/>
        }
    ];
    /*

         *
        		{name: 'Licenses & Access Limitations', component: <AccessStep metadata={metadata} />},
         {name: 'Developers & Contributors', component: <AgentsStep metadata={metadata} />},
        		{name: 'Organizations', component: <OrgsStep metadata={metadata}/>},
        		{name: 'Identifiers', component: <RIsStep metadata={metadata}/>},
        		{name: 'Recipient Information', component: <RecipientStep metadata={metadata}/>},
        		{name: 'Summary', component: <ConfirmStep metadata={metadata}/> }
         */
    let i = 0;
    for (i = 0; i < publishSteps.length; i++){
        publishSteps[i].key = "" + (i + 1);
      }
    let x = 0;
    for (x = 0; x < submitSteps.length; x++){
        submitSteps[x].key = "" + (x + i + 1);
}

    var loc = window.location.href.toString();
    if(loc.indexOf('announce')>-1){
      addMetaTags([{name:'title',content:'Announce'}]);
    }else if(loc.indexOf('submit')>-1){
      addMetaTags([{name:'title',content:'Submit'}]);
    }else if(loc.indexOf('approve')>-1){
      addMetaTags([{name:'title',content:'Approve'}]);
    }

    }

exitModalCallback() {
  this.setState({
        showModal: false,
        modalTitle: null,
        modalMessage: null,
        isError: false});
}

parseErrorResponse(jqXhr, exception) {

if (jqXhr.status === 401) {
    window.sessionStorage.lastLocation = window.location.href;
    window.sessionStorage.lastRecord = JSON.stringify(metadata.getData());
    window.location.href = '/doecode/login?redirect=true';

} else if (jqXhr.status === 403) {
    window.location.href = '/doecode/forbidden';
} else {
    //window.location.href = '/doecode/error';

    let x = 0;
    let msg = "";

    if (jqXhr.responseJSON && jqXhr.responseJSON.errors) {
      for (x = 0; x < jqXhr.responseJSON.errors.length; x++) {
          msg += (msg == "" ? "" : "; ") + jqXhr.responseJSON.errors[x];
      }
    }

    if (msg == "")
      msg = "Internal Server Error: " + jqXhr.status;

    this.setState({isError: true, modalMessage: msg});
}

}

componentDidMount() {
    if (this.props.page == 'announce' || this.props.page == 'approve') {
        this.setState({"showAll": true});
    }

    const codeID = getQueryParam("code_id");

    if (window.sessionStorage.lastRecord) {
        //do an authenticated ajax against our allowed endpoing to check if valid and then do this in the success response...
        checkIsAuthenticated();
        metadata.loadRecordFromSessionStorage(JSON.parse(window.sessionStorage.lastRecord), this.props.page);
        window.sessionStorage.lastRecord = "";
    } else if (codeID) {
        this.setState({showModal : true});
        doAuthenticatedAjax('GET', "/doecode/api/metadata/" + codeID, this.parseReceiveResponse);
    } else {
        checkIsAuthenticated();
    }

    if (this.props.page == 'submit') {
        metadata.requireOnlyPublishedFields();
    }
}

 showAdditionalFields() {
	 this.setState({"showAll" : true});
 }

parseReceiveResponse(data) {
    this.setState({"workflowStatus": data.metadata.workflow_status});
    metadata.loadRecordFromServer(data.metadata, this.props.page);
    if (this.props.page == 'submit') {
        metadata.requireOnlyPublishedFields();
    }
    this.setState({showModal : false});
}

autopopulate(event) {
    this.setState({showModal : true});
    doAjax('GET', "/doecode/api/metadata/autopopulate?repo=" + metadata.getValue('repository_link'), this.parseAutopopulateResponse);
    event.preventDefault();
}

parseAutopopulateResponse(responseData) {
    if (responseData !== undefined) {
        metadata.updateMetadata(responseData.metadata);
      }
    this.setState({showModal : false});
}




save() {
    this.setState({showModal : true, modalTitle: "Saving"});

    if (metadata.getValue("accessibility") == 'OS' || (Array.isArray(metadata.getValue("files").slice()) && metadata.getValue("files").length == 0)) {
      doAuthenticatedAjax('POST', '/doecode/api/metadata/save', this.parseSaveResponse, metadata.serializeData(), this.parseErrorResponse);
    } else {
      this.doMultipartSubmission('/doecode/api/metadata/save',this.parseSaveResponse);
  }
}

publish() {
    this.setState({showModal : true, modalTitle: "Submitting"});

    if (metadata.getValue("accessibility") == 'OS' || metadata.getValue("files").length == 0) {
      doAuthenticatedAjax('POST', '/doecode/api/metadata/submit', this.parsePublishResponse, metadata.serializeData(), this.parseErrorResponse);
    } else {
      this.doMultipartSubmission('/doecode/api/metadata/submit',this.parsePublishResponse);
  }
}

submit() {
    this.setState({showModal : true, modalTitle: "Announcing"});

    if (metadata.getValue("accessibility") == 'OS' || metadata.getValue("files").length == 0) {
      doAuthenticatedAjax('POST', '/doecode/api/metadata/announce', this.parseSubmitResponse, metadata.serializeData(), this.parseErrorResponse);
  } else {
      this.doMultipartSubmission('/doecode/api/metadata/announce',this.parseSubmitResponse);
  }
}

approve() {
    const codeID = getQueryParam("code_id");

    this.setState({showModal : true, modalTitle: "Approving"});

    doAuthenticatedAjax('GET', '/doecode/api/metadata/approve/'+codeID, this.parseApproveResponse, null, this.parseErrorResponse);
}

doMultipartSubmission(url, successCallback) {
  const files = metadata.getValue("files");
  let formData = new FormData();
  formData.append('file', files[0]);
  formData.append('metadata', JSON.stringify(metadata.serializeData()));
  doAuthenticatedMultipartRequest(url,formData, successCallback, this.parseErrorResponse);
}

parseSaveResponse(data) {
    this.setState({showModal : false});
    metadata.setValue("code_id", data.metadata.code_id);
}


parsePublishResponse(data) {
    window.location.href = "/doecode/confirm?workflow=submitted&code_id=" + data.metadata.code_id;
}

parseSubmitResponse(data) {
    window.location.href = "/doecode/confirm?workflow=announced&code_id=" + data.metadata.code_id;
}

parseApproveResponse(data) {
    window.location.href = "/doecode/pending";
}

setActivePanel(currentKey) {

    if (currentKey == this.state.activePanel) {
        this.setState({"activePanel": -1});
    } else {
        this.setState({"activePanel": currentKey});
    }
}

panelSelect(currentKey) {
  let activePanels = this.state.activePanels;
  activePanels[currentKey - 1] = !activePanels[currentKey - 1];
  this.setState({"activePanels" : activePanels});
}

buildPanel(obj) {
        let requiredText = "";
        let optionalText = "";
        let panelStyle = "default";

        const panelStatus = metadata.getPanelStatus(obj.name);
        const required_status = panelStatus.remainingRequired>0 ? 'required-field-span clickable':' clickable';

             if (panelStatus.remainingRequired > 0) {
                  requiredText += " (Fields Required) ";
             }
             else {

            	 if (panelStatus.hasRequired) {
            		 requiredText += " (All Required Fields Completed) ";
            	 }
             }

        let arrowBool = this.state.activePanel == obj.key;

        if (this.props.page == 'announce' || this.props.page == 'approve') {
              arrowBool = this.state.activePanels[obj.key - 1];
        }


        const heading = <div> <span title={obj.name} className={required_status}>{obj.name}
                {requiredText}</span>
        {panelStatus.hasRequired && panelStatus.remainingRequired == 0 &&
        <span className="green fa fa-check"></span>
        }
        {arrowBool &&
        <span title='Close' className="pull-right fa fa-chevron-down clickable"></span>
        }

        {!arrowBool &&
        <span title='Open' className="pull-right fa fa-chevron-right clickable"></span>
        }
      </div>;

        const expandedBool = this.props.page == 'announce' || this.props.page == 'approve';


        if (this.props.page == 'approve') {
        return <Panel header={heading} defaultExpanded={expandedBool} onSelect={this.panelSelect} bsStyle={panelStyle} eventKey={obj.key} key={obj.key}>

      	<div>
		    </div>

        {panelStatus.errors &&
        <div className="error-color">
        <h3> <strong> {panelStatus.errors} </strong> </h3>
        </div>
        }

        {obj.component}

        </Panel>
        } else {
        return <Panel header={heading} defaultExpanded={expandedBool} onSelect={this.panelSelect} collapsible bsStyle={panelStyle} eventKey={obj.key} key={obj.key}>

      	<div>
		    </div>

        {panelStatus.errors &&
        <div className="error-color">
        <h3> <strong> {panelStatus.errors} </strong> </h3>
        </div>
        }

        {obj.component}

        </Panel>
        };
    }



    render() {

      const info = metadata.infoSchema;
      const submitDisabled = !metadata.validateSchema();
      const publishDisabled = !metadata.validatePublishedFields();

      const publishClass = publishDisabled ? "pure-button btn-lg pull-right doecode-wizard-btn wizard-margin-style " : "pure-button pure-button-primary btn-lg pull-right doecode-wizard-btn wizard-margin-style ";
      const approveClass = "pure-button pure-button-primary  btn-lg pull-right doecode-wizard-btn wizard-margin-style ";
      const submitClass = submitDisabled ? "pure-button btn-lg pull-right doecode-wizard-btn wizard-margin-style " : "pure-button pure-button-primary btn-lg pull-right doecode-wizard-btn wizard-margin-style ";
      const codeID = metadata.getValue("code_id");

      let headerText = "Submit a New Software Project";
      if (codeID !== undefined && codeID > 0){
    	  headerText = (this.props.page == 'approve' ? "Approving" : "Editing") + " Software Project #" + codeID;
        var codeIDAction = (this.props.page == 'approve' ? "Approving" : "Editing") + " Software Project #" + codeID;
          document.title='DOE CODE: '+codeIDAction;
}else{
  document.title = 'DOE CODE: Submit New Software Project';
}
      const self = this;

        const publishPanels = publishSteps.map(this.buildPanel);

        let submitPanels = null;

        if (this.state.showAll) {
          submitPanels = submitSteps.map(this.buildPanel);
        }


        let button = null;

        let saveBtn = (this.state.workflowStatus != "Submitted" && this.state.workflowStatus != "Approved" &&
          <div>
              <button title='Save Your Progress' type="button" className="pure-button button-secondary btn-lg pull-right doecode-wizard-btn save-btn-margin" onClick={this.save}>
                  Save Your Progress
                </button>
          </div>
        );

        if (this.props.page == 'announce') {
        button =             <div className="form-group-xs row col-sm-12">
          <br/>
                            <div>
                                <button title='Announce Project to E-Link' type="button" className={submitClass} disabled={submitDisabled} onClick={this.submit}>
                                    Announce Project to E-Link
                                </button>
                            </div>
                            {saveBtn}
                        </div>
        } else if (this.props.page == 'approve') {
          button =           <div className="form-group-xs row col-sm-12">
            <br/>
                          <div>
                              <button title='Approve Project' type="button" className={approveClass} onClick={this.approve}>
                                  Approve Project
                              </button>
                          </div>

                      </div>
        } else {
          button =           <div className="form-group-xs row col-sm-12">
                <br/>
                          <div>
                              <button title='Submit Project' type="button" className={publishClass} disabled={(publishDisabled==true) ? 'disabled' : ''} onClick={this.publish}>
                                  Submit Project
                              </button>
                          </div>
                          {saveBtn}

                      </div>
        };

        const accordionBool = this.props.page == 'submit';

        const disableForm = this.props.page == 'approve';

        let coreForm =
        <div>
        <PanelGroup defaultActiveKey="1" accordion={accordionBool} onSelect={this.setActivePanel}>
        {publishPanels}

        {submitPanels}

        </PanelGroup>

        {!this.state.showAll &&
        <div >
          <div>
            <button type="button" className="btn" onClick={this.showAdditionalFields}>
              <span className="fa fa-plus-square-o"></span> Show Additional Optional Fields
            </button>
          </div>
        </div>
        }
        </div>;

        let coreContent = null;

        // this was "if isDisabled", but for now unlock with "if false"
        if (false) {
          coreContent =
          <div>
          <form><fieldset disabled>
          {coreForm}
          </fieldset></form>
          </div>;
        } else {
          coreContent =
          <div>
          {coreForm}
          </div>;
        };


        let content = <div>
        {coreContent}
        {button}
        </div>;

        return (


    <div className="row not-so-wide-row">
            <div className="col-md-3"></div>
             <div className="col-md-6 col-xs-12">
                 <div className="form-group form-group-sm row">
                     <div className="col-xs-12 center-text">
                         <h1> {headerText} </h1>
                         <a title='More detailed information on this process can be found on our Help page' href="/doecode/help">More detailed information on this process can be found on our Help page</a>
                     </div>
                 </div>
                 {content}
                 <MessageBoxModal
                         showModal={this.state.showModal}
                         showSpinner
                         isError={this.state.isError}
                         title={this.state.modalTitle}
                         items={[this.state.modalMessage]}
                         showCloseButton={this.state.isError}
                         exitCallback={this.exitModalCallback}
                 />
             </div>
             <div className="col-md-3"></div>
    </div>

        );
    }
}
