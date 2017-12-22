import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import DevsModalContent from '../ModalComponents/DevsModalContent'
import RIsModalContent from '../ModalComponents/RIsModalContent'
import OrgsModalContent from '../ModalComponents/OrgsModalContent'
import ContributorsModalContent from '../ModalComponents/ContributorsModalContent'


import DeveloperField from '../field/DeveloperField';
import ContributorField from '../field/ContributorField';
import SponsoringOrganizationField from '../field/SponsoringOrganizationField';
import ContributingOrganizationField from '../field/ContributingOrganizationField';
import ResearchOrganizationField from '../field/ResearchOrganizationField';
import RelatedIdentifierField from '../field/RelatedIdentifierField';


import {observer} from "mobx-react";
import Metadata from '../stores/Metadata';

const metadata = new Metadata();
@observer
export default class AgentsModal extends React.Component {
    constructor(props) {
        super(props);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    close() {
        this.props.tableStore.showModal = "";
        this.props.tableStore.isEdit = false;
        this.props.data.clear();
    }

    open() {
        this.props.tableStore.isEdit = false;
        this.props.tableStore.showModal = this.props.dataType;
    }

    handleSave(event) {


        if (this.props.data.validateSchema(true)) {
        	 metadata.saveToArray(this.props.dataType,this.props.data.getData());
            this.close();
        }


    }

    handleDelete(event) {
    	metadata.removeFromArray(this.props.dataType,this.props.data.getData());
        this.close();
    }

    render() {
        const showModal = this.props.tableStore.showModal;


        const fields = {
            "developers" : DeveloperField,
            "contributors" : ContributorField,
            "sponsoring_organizations" : SponsoringOrganizationField,
            "contributing_organizations" : ContributingOrganizationField,
            "research_organizations" : ResearchOrganizationField,
            "related_identifiers" : RelatedIdentifierField
        };

        const labels = {
          "developers" : "Developers",
          "contributors" : "Contributors",
          "sponsoring_organizations" : "Sponsoring Organizations",
          "contributing_organizations" : "Contributing Organizations",
          "research_organizations" : "Research Organizations",
          "related_identifiers" : "Related Identifiers"
        }

        const SpecificField = fields[this.props.dataType];
        const label = labels[this.props.dataType];

        let content = null;
        if (this.props.contentType === 'Devs') {
        content = <DevsModalContent SpecificField={SpecificField} data={this.props.data}/>
      } else if (this.props.contentType === 'Orgs') {
        content = <OrgsModalContent SpecificField={SpecificField} data={this.props.data} type={this.props.dataType}/>
      } else if (this.props.contentType === 'RIs') {
    	content = <RIsModalContent SpecificField={SpecificField} data={this.props.data}/>
      } else if (this.props.contentType == 'Contributors') {
    	content =  <ContributorsModalContent SpecificField={SpecificField} data={this.props.data}/>
      }

       const disabled = !this.props.data.validateSchema();
       let errorMessage = "";

       const errors = this.props.data.checkForSchemaErrors();


       if (errors.length > 0)
    	   errorMessage = "The following fields contain errors: " + errors.join(", ");


        return (
            <div className="form-group form-group-sm">
                <div className="col-xs-12 center-text">
                    <button type='button' title={label} className='pure-button pure-button-primary btn-lg' onClick={this.open}>
                      Add {label}
                    </button>

                    <Modal show={this.props.dataType === this.props.tableStore.showModal} onHide={this.close} bsSize="large">
                        <Modal.Header closeButton>
                            <Modal.Title>Manage {label}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                         {errorMessage &&
                         <div className="error-color">
                         <h2>{errorMessage}</h2>
                         </div>
                         }
                            {content}
                        </Modal.Body>
                        <Modal.Footer>
                            <button onClick={this.close} type='button' className='pure-button'>Close</button>&nbsp;
                            {this.props.tableStore.isEdit && <button type='button' title='Delete' className='pure-button button-error' onClick={this.handleDelete}>Delete</button>}
                            &nbsp;
                            <button type='button' title='Save and Close' className='pure-button pure-button-primary' onClick={this.handleSave} disabled={(disabled==true) ? 'disabled' : ''}>Save and Close</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}
