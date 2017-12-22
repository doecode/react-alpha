import React from 'react';
import ReactDOM from 'react-dom';
import {Dropdown, MenuItem, Modal} from 'react-bootstrap';
import SimpleDropdown from '../fragments/SimpleDropdown';
import {downloadJSONFile} from '../utils/utils';

export default class BiblioSidebar extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    const fieldMapdata = this.props.pageData.fieldMap;
    const doi = (fieldMapdata.doi)
      ? "https://dx.doi.org/" + fieldMapdata.doi
      : "";

    var fulltextURL = "";
    var fulltextMsg = "";

    if (fieldMapdata.repository_link !== '') {
      fulltextURL = fieldMapdata.repository_link;
      fulltextMsg = "Publicly Accessible Repository";
    } else {
      fulltextURL = fieldMapdata.landing_page;
      fulltextMsg = "Project Landing Page";
    }

    var has_http = new RegExp(/^http:\/\/|https:\/\//);
    if (!has_http.test(fulltextURL)) {
      fulltextURL = ("http://" + fulltextURL);
    }

    const export_metadata = [
      {
        customAnchor: true,
        display: <a title='Export to XML' href={'/doecode/api/search/' + fieldMapdata.code_id + '?format=xml'} download={fieldMapdata.code_id + '.xml'}>XML</a>
      }, {
        customAnchor: true,
        display: <a title='Export to YAML' href={'/doecode/api/search/' + fieldMapdata.code_id + '?format=yaml'} download={fieldMapdata.code_id + '.yaml'}>YAML</a>
      }, {
        customAnchor: true,
        display: <a title='Export to JSON' href={'/doecode/api/search/' + fieldMapdata.code_id + '?format=json'} download={fieldMapdata.code_id + '.json'}>JSON</a>
      }
    ];
    const share_lbl = <span className="fa fa-share-alt shareAlt"></span>;
    const share_list = [
      {
        customAnchor: true,
        display: (
          <a title='LinkedIn' href={"https://www.linkedin.com/shareArticle?mini=true&url=" + window.location.href + "&title=DOE Research from DOE CODE&summary=&source="} target="_blank" className="pure-menu-link social">
            <span className="fa fa-linkedin linkedin"></span>&nbsp;LinkedIn</a>
        )
      }, {
        customAnchor: true,
        display: (
          <a title='Pinterest' href={"https://pinterest.com/pin/create/button/?url=&media=" + window.location.href + "&description="} target="_blank" className="pure-menu-link social">
            <span className="fa fa-pinterest pintrest"></span>&nbsp;Pinterest</a>
        )
      }, {
        customAnchor: true,
        display: (
          <a title='Tumblr' href={"http://www.tumblr.com/share?v=3&u=" + window.location.href + "&t="} target="_blank" className="pure-menu-link social">
            <span className="fa fa-tumblr tumblr"></span>&nbsp;Tumblr</a>
        )
      }
    ];
    return (
      <div className={this.props.sidebarClass}>
        <div className='row'>
          <div className='col-xs-12'>
            <div className='row biblio-sidebar-row'>
              <div className='col-xs-12'>
                <h4 className='biblio-sidebar-subtitle'>Resource:</h4>
                {(doi && fieldMapdata.release_date) && <span>
                  DOI:&nbsp;<a title={'DOI: ' + doi} href={doi} target='_blank' className='biblio-sidebar-traditional-anchor'>{fieldMapdata.doi}</a>
                  <br/>
                  <span className='text-muted doi-subnotice'></span>
                  <br/>
                  <br/>
                </span>}
                <span className='biblio-sidebar-secondary-subtitle'>{fulltextMsg}</span>
                <br/>
                <a title={fulltextURL} href={fulltextURL} target='_blank' className='biblio-sidebar-traditional-anchor word-break'>{fulltextURL}</a>
              </div>
            </div>
            <div className='row biblio-sidebar-row'>
              <div className='col-xs-12'>
                <h4 className='biblio-sidebar-subtitle'>SAVE&nbsp;/&nbsp;SHARE</h4>
                <div>
                  <SimpleDropdown noBtnPadding items={export_metadata} label='Export Metadata'/>
                </div>
                <br/>
                <div className="row ">
                  <div className='col-xs-12'>
                    <ul className="list-inline">
                      <li className='biblio-social-link'>
                        <a title='Facebook' target="_blank" href={"https://www.facebook.com/sharer/sharer.php?u=" + window.location.href}>
                          <span className="fa fa-facebook facebook"></span>
                        </a>
                      </li>
                      <li className='biblio-social-link'>
                        <a title='Twitter' target="_blank" href={'https://twitter.com/home?status=DOE Research from DOE CODE: ' + window.location.href}>
                          <span className="fa fa-twitter twitter"></span>
                        </a>
                      </li>
                      <li className='biblio-social-link'>
                        <a title='Google Plus' target="_blank" href={'https://plus.google.com/share?url=' + window.location.href}>
                          <span className="fa fa-google-plus gplus"></span>
                        </a>
                      </li>
                      <li className='biblio-social-link'>
                        <a title='Email' href={"mailto:?subject=Software Project from DOE CODE&body=" + window.location.href}>
                          <span className="fa fa-envelope shareEmail"></span>
                        </a>
                      </li>
                      <li className='biblio-social-link'>
                        <SimpleDropdown title='Share' noBtnPadding noToggleArrow ulClasses='dropdown-menu dropdown-menu-left' items={share_list} label={share_lbl}/>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
