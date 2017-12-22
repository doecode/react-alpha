import BaseData from './BaseData';
import MetadataStore from './MetadataStore';
import {toJS} from 'mobx';
import moment from 'moment';

const parents = [
  "developers",
  "contributors",
  "sponsoring_organizations",
  "research_organizations",
  "contributing_organizations",
  "related_identifiers"
];
export default class Metadata extends BaseData {

  constructor() {
    const props = {
      fieldMap: MetadataStore.metadata,
      infoSchema: MetadataStore.metadataInfoSchema
    };
    super(props);

  }

  saveToArray(field, data) {
    if (typeof data.id != "number")
      this.addToArray(field, data);
    else
      this.modifyElementInArray(field, data)

    this.infoSchema[field].completed = true;
    this.infoSchema[field].ever_completed = true;
    this.infoSchema[field].error = '';
  }

  addToArray(field, data) {
    data.id = this.fieldMap[field].length;
    this.fieldMap[field].push(data);
  }

  modifyElementInArray(field, data) {
    const index = data.id;

    if (index > -1)
      this.fieldMap[field][index] = data;
  }

  removeFromArray(field, data) {
    const index = data.id;
    this.fieldMap[field].splice(index, 1);

    // renumber ids as needed
    const end = this.fieldMap[field].length;
    for (var i = index; i < end; i++) {
      this.fieldMap[field][i].id = i;
    }

    if (this.fieldMap[field].length == 0)
      this.infoSchema[field].completed = false;
  }

  getPanelStatus(panelName) {

    let panelStatus = {
      "remainingRequired": 0,
      "completedRequired": 0,
      "remainingString": "",
      "remainingOptional": 0,
      "completedOptional": 0,
      "errors": "",
      "hasRequired": false,
      "hasOptional": false
    }
    let incompleteRequiredFields = [];
    for (var field in this.infoSchema) {
      const obj = this.getFieldInfo(field);

      if (obj.Panel == panelName) {

        if (obj.error)
          panelStatus.errors += obj.error + " ";

        if (obj.required) {
          panelStatus.hasRequired = true;
          if (obj.completed) {
            panelStatus.completedRequired++;
          }
          else {
            panelStatus.remainingRequired++;
            incompleteRequiredFields.push(obj.label);
          }

        } else {
          panelStatus.hasOptional = true;
          if (obj.completed) {
            panelStatus.completedOptional++;
          }
          else {
            panelStatus.remainingOptional++;
          }
        }
      }

    }

    if (incompleteRequiredFields.length > 0)
      panelStatus.remainingString = incompleteRequiredFields.join(", ");

    return panelStatus;
  }

  markPanelRequired(panelName) {
    for (var field in this.infoSchema) {
      const obj = this.getFieldInfo(field);

      if (obj.Panel == panelName) {

        if (obj.required && !obj.completed) {
          obj.error = "Valid input is required.";
        }

      }
    }
  }

  loadRecordFromServer(data, page) {
    //deserializeData
    this.deserializeData(data);
    this.applyValidations();
    if (page === 'submit') {
      this.validatePublishedFields();
    }

  }

  loadRecordFromSessionStorage(data, page) {
    this.loadValues(data);
    this.applyValidations();
    if (page === 'submit') {
      this.validatePublishedFields();
    }

  }

  applyValidations() {
    const data = this.fieldMap;
    for (var field in data) {

      if (field === 'accessibility' && data[field] != 'OS') {
        this.infoSchema["repository_link"].required = "";
        this.infoSchema["repository_link"].Panel = "";
        this.infoSchema['file_name'].required = "announ";
        this.infoSchema['file_name'].Panel = 'Supplemental Product Information';
        this.infoSchema['landing_page'].required = "sub";
        this.infoSchema['landing_page'].Panel = 'Repository Information';
      }

      if (field === 'doi_status' && data[field] == 'RES') {
        this.infoSchema["doi_infix"].Panel = "DOI and Release Date"
      }

      if (field === 'licenses' && data[field].indexOf('Other') > -1) {
        this.infoSchema['proprietary_url'].required = "sub";
        this.infoSchema['proprietary_url'].Panel = "Product Description";
      }
    }
  }

  deserializeData(data) {

    for (var field in data) {

      if (this.fieldMap[field] !== undefined && data[field] !== undefined && !(Array.isArray(data[field]) && data[field].length === 0)) {

        if (parents.indexOf(field) > -1) {
          const end = data[field].length;
          for (var i = 0; i < end; i++) {
            data[field][i].id = i;
          }
        }

        if (field === 'release_date')
          data.release_date = moment(data.release_date, "YYYY-MM-DD");

        if (field === 'sponsoring_organizations')
          this.deserializeSponsoringOrganization(data);

        this.fieldMap[field] = data[field];
        if (this.infoSchema[field]) {
          this.infoSchema[field].completed = true;
          this.infoSchema[field].ever_completed = true;
        }
      }
    }
  }

  deserializeSponsoringOrganization(data) {
    const sponsoringOrganizations = data.sponsoring_organizations;
    const end = sponsoringOrganizations.length;
    for (var i = 0; i < end; i++) {

      const fundingIDs = sponsoringOrganizations[i].funding_identifiers;
      const awardNumbers = [];
      const brCodes = [];
      const fwpNumbers = [];

      if (fundingIDs !== undefined) {

        const fundingLength = fundingIDs.length;
        for (var x = 0; x < fundingLength; x++) {
          let val = new String(fundingIDs[x].identifier_value);
          if (fundingIDs[x].identifier_type === 'AwardNumber') {
            awardNumbers.push(val.toString());
          } else if (fundingIDs[x].identifier_type === 'BRCode') {
            brCodes.push(val.toString());
          } else if (fundingIDs[x].identifier_type === 'FWPNumber') {
            fwpNumbers.push(val.toString());
          }

        }

      }

      data.sponsoring_organizations[i].award_numbers = awardNumbers;
      data.sponsoring_organizations[i].br_codes = brCodes;
      data.sponsoring_organizations[i].fwp_numbers = fwpNumbers;

      delete data.sponsoring_organizations[i].funding_identifiers;
    }
  }
  updateMetadata(data) {
    const oldRepo = new String(this.fieldMap.repository_link);
    this.deserializeData(data);
    this.fieldMap.repository_link = oldRepo.toString();
  }

  serializeData() {
    const data = this.getCompletedData();

    let end = 0;
    if (data.sponsoring_organizations)
      end = data.sponsoring_organizations.length;

    for (var i = 0; i < end; i++) {
      const sponsor = data.sponsoring_organizations[i];
      let fundingIdentifiers = [];

      const awardNumbers = sponsor.award_numbers;
      const brCodes = sponsor.br_codes;
      const fwpNumbers = sponsor.fwp_numbers;

      for (var x = 0; x < awardNumbers.length; x++) {
        fundingIdentifiers.push({identifier_type: "AwardNumber", identifier_value: awardNumbers[x]})
      }

      for (var x = 0; x < brCodes.length; x++) {
        fundingIdentifiers.push({identifier_type: "BRCode", identifier_value: brCodes[x]})
      }

      for (var x = 0; x < fwpNumbers.length; x++) {
        fundingIdentifiers.push({identifier_type: "FWPNumber", identifier_value: fwpNumbers[x]})
      }

      data.sponsoring_organizations[i].funding_identifiers = fundingIdentifiers;

    }

    return data;

  }

  validatePublishedFields() {
    let isValid = true;

    var blah = [];

    for (var field in this.infoSchema) {
      const information = this.infoSchema[field];

      if (information.error) {
        isValid = false;
      } else if (information.required === "sub" && !information.completed) {
        if(blah.indexOf(field)<0){
          blah.push(field);
        }
        isValid = false;
      }

    }
    return isValid;
  }

  requireOnlyPublishedFields() {
    for (var field in this.infoSchema) {
      const information = this.infoSchema[field];
      if (information.required == "announ") {

        information.required = "";
      }

    }
  }

}
