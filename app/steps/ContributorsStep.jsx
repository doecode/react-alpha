import React from 'react';
import AgentsModal from './AgentsModal';
import TableStore from '../stores/TableStore';
import EditableDataTable from './EditableDataTable';
import Developer from '../stores/Developer';
import Contributor from '../stores/Contributor';
import Metadata from '../stores/Metadata';
import {observer} from 'mobx-react';
import {Tabs, Tab} from 'react-bootstrap';
import Promise from 'promise';
import {getChildData} from '../utils/utils'
import HelpTooltip from '../help/HelpTooltip';

const tableStore = new TableStore();
const metadata = new Metadata();

@observer
export default class ContributorsStep extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "key": 0
    };

    this.isValidated = this._isValidated.bind(this);
    this.onTabSelect = this.onTabSelect.bind(this);
  }

  _isValidated() {


  }

  onTabSelect(key) {
    this.setState({"key": key});

  }

  render() {

    const tableConfig = [
      {
        "columnName": "place",
        "order": 1,
        "locked": false,
        "visible": false,
        "displayName": "#"

      }, {
        "columnName": "first_name",
        "order": 2,
        "locked": false,
        "visible": true,
        "displayName": "First Name"
      }, {
        "columnName": "middle_name",
        "order": 3,
        "locked": false,
        "visible": true,
        "displayName": "Middle Name"

      }, {
        "columnName": "last_name",
        "order": 4,
        "locked": false,
        "visible": true,
        "displayName": "Last Name"
      }, {
        "columnName": "email",
        "order": 5,
        "locked": false,
        "visible": true,
        "displayName": "Email"
      }, {
        "columnName": "orcid",
        "order": 6,
        "locked": false,
        "visible": true,
        "displayName": "ORCID"
      }, {
        "columnName": "affiliations",
        "order": 7,
        "locked": false,
        "visible": true,
        "displayName": "Affiliations"
      }, {
        "columnName": "organization_name",
        "order": 8,
        "locked": false,
        "visible": true,
        "displayName": "Organization Name"
      }, {
        "columnName": "contributor_type",
        "order": 9,
        "locked": false,
        "visible": true,
        "displayName": "Contributor Type"
      }, {
        "columnName": "id",
        "order": 10,
        "locked": false,
        "visible": false,
        "displayName": "id"
      }
    ];

    const opts = ["contributors", "contributing_organizations"];
    const parentName = opts[this.state.key];

    const contentType = "Contributors";
    let columns = [];

    if (parentName === 'contributors')
      columns = ["first_name", "last_name"];
    else
      columns = ["organization_name"];

    columns.push("contributor_type");

    const panelStatus = metadata.getPanelStatus("Contributors and Contributing Organizations");
    const isRequired = panelStatus.hasRequired;

    const noticeArray = metadata.getValue(parentName);
    const noticeArrayCount = (noticeArray ? noticeArray.length : 0);

    const divStyle = (noticeArrayCount > 0 ? "has-success " : "");
    const labelStyle = "control-label" + (isRequired ? " req" : "");

    const contentC = parentName === 'contributors' && <EditableDataTable columns={columns} contentType={contentType} config={tableConfig} parentName={parentName}/>
    const contentCO = parentName === 'contributing_organizations' && <EditableDataTable columns={columns} contentType={contentType} config={tableConfig} parentName={parentName}/>

    return (
      <div className="container-fluid form-horizontal">
        <div className="row">
          <div>
            <div className="form-horizontal">
              <Tabs activeKey={this.state.key} onSelect={this.onTabSelect} id="devsStepTabs">
                <Tab eventKey={0} title="Contributors">
                  <div className={divStyle}>
                    <br />
  									<label className={labelStyle}>Contributors</label> &nbsp;<HelpTooltip item='Contributor'/>
                    {contentC}
                  </div>
                </Tab>
                <Tab eventKey={1} title="Contributing Organizations">
                  <div className={divStyle}>
                    <br />
  									<label className={labelStyle}>Contributing Organizations</label> &nbsp;<HelpTooltip item='ContributorOrg'/>
                    {contentCO}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
