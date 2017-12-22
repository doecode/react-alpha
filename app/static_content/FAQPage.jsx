import React from 'react';

export default class FAQ extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var api_location = window.location.href.toString().substr(0, window.location.href.toString().indexOf('/doecode'));
    api_location += "/doecodeapi/services";
    /*If you want something added to this page, just plop it right in to this array in the order you want*/
    const fa_items = [
      {
        anchor: 'what-is',
        text: <span className='faq-page-subtitle'>What is DOE CODE?</span>,
        content: <p>
            DOE CODE is the U.S. Department of Energy’s (DOE) new software services platform and search tool for software resulting from DOE-funded research that provides functionality for collaboration, archiving, and discovery of scientific software funded by DOE. DOE CODE replaces the Energy Science and Technology Software Center (ESTSC). DOE CODE is an open source project and is available on GitHub. Throughout these FAQs, the terms "software" and "code" are used interchangeably, though it is understood there are discrete definitions in various communities.
          </p>
      }, {
        anchor: 'what-does-alpha',
        text: <span className='faq-page-subtitle'>What does it mean for DOE CODE to be released in Alpha?</span>,
        content: <p>
            In Alpha, DOE CODE supports submission of software projects, code repository services, and search and discovery of submitted software projects. As development of DOE CODE continues toward Beta and Production releases, additional features and functionality will be included. Future requirements will include support and archiving of additional repository types, automated alerting for software points of contact, authentication using GitHub accounts, and more user profile features.
          </p>

      }, {
        anchor: 'how-is-it-different',
        text: <span className='faq-page-subtitle'>How is the DOE CODE software submission and search tool different than&nbsp;
          <a title='DOE CODE Github' target="_blank" href='https://github.com/doecode'>DOE CODE GitHub</a>?
        </span>,
        content: <p>
            DOE CODE provides for the submission and search of software at this site. DOE CODE is a dedicated resource for members of the community to discover and share software developed by DOE-funded projects and provides submission and search options. The DOE CODE "platform" that runs this site is an open source project available on GitHub.
            <br/><br/>
            The DOE CODE GitHub Community is a dedicated GitHub organization that houses the source code for some projects funded by DOE, including the repositories for DOE CODE itself. This community is open to registered users of DOE CODE and those users are welcome to create and import their own repositories once they join. This service is provided by OSTI in recognition of the fact that many developers prefer to house and manage their projects on GitHub over other services.
            <br/><br/>
            Users may request to join the DOE CODE GitHub community by emailing a request to&nbsp;<a href='mailto:doecoderepositories@osti.gov'>doecoderepositories@osti.gov</a>.
          </p>

      }, {
        anchor: 'what-does-it-contain',
        text: <span className='faq-page-subtitle'>What does DOE CODE contain?</span>,
        content: <p>
            DOE CODE contains records for DOE-funded software and links to the software or code repository. In addition to the code, the repositories may include manuals, examples, test data, etc.
          </p>
      }, {
        anchor: 'what-does-it-provide',
        text: <span className='faq-page-subtitle'>Does DOE CODE provide repository services?</span>,
        content: <p>
            Yes. DOE CODE provides repository hosting services for the DOE community via&nbsp;<a title='DOE CODE Github' target='_blank' href='https://github.com/doecode/doecode'>GitHub</a>&nbsp;and&nbsp;<a title='Gitlab' target='_blank' href='https://gitlab.osti.gov/users/sign_in'>GitLab</a>. GitHub repository services are for those who want typical GitHub open source project functionality. OSTI’s GitLab repository service offers the same functionality as the GitHub repository service, but allows for open or closed repositories and more control of the code.
            <br/><br/>
            If you are interested in making use of the GitHub or GitLab repository services, or to request to join the DOE CODE GitHub community please contact&nbsp;<a title='Email doecoderepositories@osti.gov' href='mailto:doecoderepositories@osti.gov'>doecoderepositories@osti.gov</a>.
          </p>
      }, {
        anchor: 'what-are-the-types',
        text: <span className='faq-page-subtitle'>What are the types of Software Availability?</span>,
        content: <div>
            <strong>Open Source, Publicly Available Repository</strong>&nbsp;- Software can be freely accessed, used, changed and shared (in modified or unmodified form) by anyone in a public repository. Open Source software is made by many people, and distributed under licenses that comply with the Open Source Definition. See the&nbsp;<a title='Open Source Initiative' target='_blank' href='https://opensource.org/'>Open Source Initiative</a>&nbsp;for more information and definitions.
            <br/><br/>
            <strong>Open Source, No Publicly Available Repository</strong>&nbsp;- Code is Open Source, but is not yet available in a public repository. Interested users can contact the developer(s) or responsible parties for information regarding access and (re)use. A landing page URL is required for submitting Open Source, no Publicly available repository code; the URL should provide additional information on how to obtain access to the code.
            <br/><br/>
            <strong>Closed Source</strong>&nbsp;- Software that is not Open Source and for which access must be granted by contacting a licensing official. Software is often Closed Source because it is proprietary, sensitive, or has otherwise been deemed appropriate for limited distribution only. A landing page URL is required for submitting Closed Source code; the URL should provide additional information on how to obtain access to the code.
          </div>
      }, {
        anchor: 'are-there-restrictions',
        text: <span className='faq-page-subtitle'>Are there restrictions on the use of the material in DOE CODE?</span>,
        content: <div>
            <p>There may be restrictions on use of the material based on the associated license(s). Currently, DOE CODE supports the following list of Open Source licenses:</p>
            <div>
              <ul>
                <li>
                  <a title='Apache License 2.0' target='_blank' href='https://opensource.org/licenses/Apache-2.0'>Apache License 2.0</a>
                </li>
                <li>
                  <a title='GNU General Public License v3.0' target='_blank' href='https://www.gnu.org/licenses/quick-guide-gplv3.html'>GNU General Public License v3.0</a>
                </li>
                <li>
                  <a title='MIT License' target='_blank' href='https://opensource.org/licenses/MIT'>MIT License</a>
                </li>
                <li>
                  <a title='BSD 2-clause "simplified" License' target='_blank' href='https://opensource.org/licenses/BSD-2-Clause'>BSD 2-clause "simplified" License</a>
                </li>
                <li>
                  <a title='BSD 3-clause "New or "Revised" License' target='_blank' href='https://opensource.org/licenses/BSD-3-Clause'>BSD 3-clause "New or "Revised" License</a>
                </li>
                <li>
                  <a title='Eclipse Public License 1.0' target='_blank' href='https://opensource.org/licenses/EPL-1.0'>Eclipse Public License 1.0</a>
                </li>
                <li>
                  <a title='GNU Affero General Public License v3.0' target='_blank' href='https://www.gnu.org/licenses/licenses.html#AGPL'>GNU Affero General Public License v3.0</a>
                </li>
                <li>
                  <a title='GNU General Public License v2.0' target='_blank' href='https://www.gnu.org/licenses/old-licenses/lgpl-2.0.html'>GNU General Public License v2.0</a>
                </li>
                <li>
                  <a title='GNU General Public License v1.0' target='_blank' href='https://www.gnu.org/licenses/old-licenses/gpl-1.0.html'>GNU General Public License v1.0</a>
                </li>
                <li>
                  <a title='GNU Lesser General Public License v2.1' target='_blank' href='https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html'>GNU Lesser General Public License v2.1</a>
                </li>
                <li>
                  <a title='GNU Lesser General Public License v3.0' target='_blank' href='https://www.gnu.org/licenses/licenses.html#LGPL'>GNU Lesser General Public License v3.0</a>
                </li>
                <li>
                  <a title='Mozilla Public License 2.0' target='_blank' href='https://opensource.org/licenses/MPL-2.0'>Mozilla Public License 2.0</a>
                </li>
                <li>
                  <a title='The Unlicense' target='_blank' href='http://unlicense.org/'>The Unlicense</a>
                </li>
              </ul>
              <br/>
              More information regarding these license can also be found at the&nbsp;
              <a title='Open Source Initiative' target='_blank' href='https://opensource.org/licenses/alphabetical'>Open Source Initiative - Licenses by Name</a>.
              <br/>
              <br/>
              If you choose to use a license not in the above list you may select "Other" and provide a URL to the landing page of the license.
            </div>
          </div>
      }, {
        anchor: 'how-is-software-submitted',
        text: <span className='faq-page-subtitle'>How is Software Submitted?</span>,
        content: <div>
            <p>Individual software records and associated metadata are directly provided by the developer or the developing organization to DOE through DOE CODE.</p>
            <p>DOE CODE offers two paths for users to provide code. Users can (1)&nbsp;
              <strong>submit</strong>&nbsp;code to DOE CODE, and (2)&nbsp;
              <strong>announce</strong>&nbsp;code to the Department of Energy for official review and release through DOE CODE. For more information about submitting and announcing code, see the "
              <a title='What does it mean to submit code to DOE CODE?' href='/doecode/faq#what-does-it-mean-to-submit'>What does it mean to submit code to DOE CODE?</a>" and "
              <a title='What does it mean to announce code to DOE CODE?' href='/doecode/faq#what-does-it-mean-to-announce'>What does it mean to announce code to DOE CODE?</a>"&nbsp; for more details.</p>
          </div>
      }, {
        anchor: 'what-does-it-mean-to-submit',
        text: <span className='faq-page-subtitle'>What does it mean to submit code to DOE CODE?</span>,
        content: <div>
            <p>Users may want to submit their code to DOE CODE, because submitting offers increased discoverability and the option to obtain a Digital Object Identifier (DOI) for the code, making it more easily citable and shared. Submitting to DOE CODE is easy, with only a minimal set of metadata required. The primary use case for this functionality includes codes that are in early development and for developers wanting to obtain DOIs early in the process. (See also "
              <a title='What is a Digital Object Identifier' href='/doecode/faq#what-is-a-doi'>What is a Digital Object Identifier (DOI)?</a>").
            </p>
            <br/>
            <div>
              Required Metadata to Submit to DOE CODE:
              <ul>
                <li>Software Availability</li>
                <li>Repository Link* or Landing Page</li>
                <li>Software Title</li>
                <li>Description/Abstract</li>
                <li>License(s)</li>
                <li>Developers</li>
              </ul>
            </div>
            <br/>
            <p>
              *Currently only Git-based repositories are supported. Most repositories hosted at GitHub, Bitbucket, SourceForge, and GitLab support Git-based repositories. When submitting a repository, users should be certain to use the direct URL to the actual repository.
            </p>
          </div>
      }, {
        anchor: 'what-does-it-mean-to-announce',
        text: <span className='faq-page-subtitle'>What does it mean to announce code to DOE CODE?</span>,
        content: <div>
            <p>Users may need to announce their code to the Department of Energy to ensure announcement and dissemination in accordance with DOE statutory responsibilities. Codes in later stages of development are the primary use case for this functionality. For announcement to the Department of Energy, there are basic requirements for metadata fields; however, other optional/non-mandatory data fields should be included during announcement when possible.
            </p>
            <div>
              DOE national laboratories and other DOE facilities/contractors who have developed and/or modified software during work supported by DOE or during work carried out for others at DOE facilities are required to announce a record of the software to the Department of Energy, if the software meets the following criteria:
              <ul>
                <li>the software meets the definition of&nbsp;
                  <a title='STI' target='_blank' href='https://www.osti.gov/stip/stidefined'>STI</a>;
                </li>
                <li>the software is known or expected to be useful inside or outside the DOE community, or is not specific to the originating site;</li>
                <li>a stable, usable, documented version of the software exists (i.e., the software is not under initial development); and</li>
                <li>the software has undergone all appropriate reviews for sensitivity and export control.</li>
              </ul>
            </div>
            <br/>
            <div>
              For additional information about DOE scientific and technical software, refer to the&nbsp;<a title='Software Best Practices' target='_blank' href='https://www.osti.gov/includes/estsc/software_best_prac.html'>Software Best Practices document</a>.
              <br/>
              <br/>
              Software that meets the following criteria need not be announced to the Department of Energy:
              <ul>
                <li>operational systems software that is site-specific, unique to a particular hardware, or necessary to ensure the fundamental operability of automated data processing equipment, whether supplied by the manufacturer of the system hardware or others;</li>
                <li>computer software programs developed and/or modified during work carried out for others at DOE facilities that are specifically excluded in the agreement under which the non-DOE funded work was performed;</li>
                <li>software generated under the auspices of the Energy Information Administration; and</li>
                <li>specific software used by power administrations for the operation, control, planning, and modeling of electric power transmission systems and the interconnected utilities; however, modifications/enhancements to portions of this software that are not an integral part of the whole and have potential application outside the power administrations should be announced.</li>
              </ul>
            </div>
            <br/>
            <div>
              Required Metadata to Announce to the Department of Energy through DOE CODE:
              <ul>
                <li>Software Availability</li>
                <li>Repository Link* or Landing Page</li>
                <li>Software Title</li>
                <li>Description/Abstract</li>
                <li>Licenses</li>
                <li>Developers</li>
                <li>Sponsoring Organization Name</li>
                <li>Primary Award Number</li>
                <li>Research Organization Name</li>
              </ul>
            </div>
            <br/>
            <p>In addition to the basic requirements for metadata fields (above), other optional/non-mandatory data fields should be included during announcement when possible.</p>
            <p>
              *Currently only Git-based repositories are supported. Most repositories hosted at git.com, bitbucket.org, sourcforge.org, and GitLab support Git-based repositories. When submitting a repository please make sure you are using the direct URL to the actual repository. As an example, the direct repository URL for DOE CODE is&nbsp;
              <a title='DOE CODE Github' target='_blank' href='https://www.github.com/doecode/doecode'>https://www.github.com/doecode/doecode</a>&nbsp;whereas the project landing page is&nbsp;
              <a title='DOE CODE Main Github' target='_blank' href='https://www.github.com/doecode'>https://www.github.com/doecode</a>. There are plans to expand this functionality in future releases to support other repository types such as SVN and CVS.
            </p>
            <p>
              NOTE: If you are submitting Open Source, No Publicly Available Repository or Close Source code through DOE CODE you will also be required to upload an archive file containing of your source code. This will be used for archiving purposes. Supported file types include: .zip, .tar, .tar.gz, and .tar.gz2.
            </p>
          </div>
      }, {
        anchor: 'what-is-a-yaml',
        text: <span className='faq-page-subtitle'>What is a YAML file? How do I auto populate the YAML file?</span>,
        content: <p>
            <a title='YAML' target='_blank' href='http://www.yaml.org/start.html'>YAML</a>&nbsp;is a human friendly data serialization standard for all programming languages. DOE CODE provides functionality to allow users to auto-populate their bibliographic data in DOE CODE by placing a specifically formatted YAML file their repository’s root main directory. The file must be named "metadata.yml" or "doecode.yml" and the file must be formatted correctly.&nbsp;
            <a title='YAML Schema' target='_blank' href='https://github.com/doecode/doecode/tree/master/metadata-schema'>See detailed YAML information and an example file.</a>
          </p>
      }, {
        anchor: 'what-are-the-categories',
        text: <span className='faq-page-subtitle'>What are the Categories of Software?</span>,
        content: <p>Different categories of software have different distribution requirements, limitations, and appropriate distribution channels, which are defined in the&nbsp;
            <a title='Software Categories' target='_blank' href='https://www.osti.gov/stip/softwarecategories'>Software Categories</a>&nbsp;table. The table is not intended to provide an exhaustive list.
          </p>
      }, {
        anchor: 'do-i-need-account',
        text: <span className='faq-page-subtitle'>Do I need an account to use DOE CODE?</span>,
        content: <p>
            A DOE CODE account is not needed to search for DOE-funded software, but an account is needed to submit or announce code. Users meeting minimum criteria can directly create a DOE CODE account. All you need is your first and last name, government email address or valid contract number, and a password.
            <br/><br/>
            Both of the repository services we provide require a separate account in addition to the account for submitting or announcing to DOE CODE. To utilize repositories on OSTI’s GitLab installation and DOE CODE GitHub, those interested must request an account by sending an email to&nbsp;<a title='Email doecoderepositories@osti.gov' href='mailto:doecoderepositories@osti.gov'>doecoderepositories@osti.gov</a>. DOE CODE Product Manager(s) will follow up with the requester.

          </p>
      }, {
        anchor: 'what-is-a-doi',
        text: <span className='faq-page-subtitle'>What is a Digital Object Identifier (DOI)?</span>,
        content: <p>
            What is a Digital Object Identifier (DOI)? A DOI is a unique persistent identifier that references a digital object and provides long term access; DOIs remain stable even in the underlying address or URL for the content changes. OSTI is a member of and registering agency for DataCite and has the authority to assign Digital Object Identifiers to software and code that are submitted by DOE and its contractors or grantees. The assigning and registration of a DOI for software is a free service provided by OSTI to enhance DOE's management of this important resource.</p>
      }, {
        anchor: 'what-are-the-benefits',
        text: <span className='faq-page-subtitle'>What are the benefits of getting a DOI for code or software?</span>,
        content: <div>
            <ul>
              <li>
                Announcing and registering code or software with DOIs enables researchers, especially future researchers, to more easily discover, access, and reuse the code or software for verification of the original experiment and to produce new results with the latest methods.</li>
              <li>DOIs facilitate accurate linkage between a document or published article and the specific underlying code or software.</li>
              <li>DOIs make code easy to cite in a standardized way (DOIs have become recognizable as pointers to important information around the globe), encouraging authors to include this step in their writing/publishing activities.</li>
              <li>Enabling your code or software to be easily citable means that code developers, contributors, and others involved in the development, but not necessarily in the authoring of a publication, can receive proper attribution.
              </li>
              <li>DOIs are designed to be more stable and persistent links than normal URLs. Registering the DOI with an international organization such as DataCite provides global resolving and the prospect of steadily increasing visibility of your research.</li>
            </ul>
          </div>
      }, {
        anchor: 'removal',
        text: <span className='faq-page-subtitle'>What if I need to have a project removed from DOE CODE?</span>,
        content: <p>To have a project removed from DOE CODE please contact&nbsp;
            <a title='Email doecode@osti.gov' href='mailto:doecode@osti.gov'>doecode@osti.gov</a>.</p>
      }, {
        anchor: 'advanced-search',
        text: <span className='faq-page-subtitle'>How do I use the Advanced Search?</span>,
        content: <div>
            The advanced search will allow you to perform more complex searches and retrieve more specific results, offering you a number of fields, such as Title, Developer(s), or Release date to help you refine your search results.
            <br/>
            <br/>
            <div className='faq-page-left-padded'>
              <strong>All Fields</strong>
              <br/>
              Searches all bibliographic data.
              <br/>
              <br/>
              <strong>Software Title</strong>
              <br/>
              Searches only software titles.
              <br/>
              <br/>
              <strong>
                Developers</strong>
              <br/>
              Searches all developer names, including ORCID if available.
              <br/>
              <br/>
              <strong>
                Identifier Numbers</strong>
              <br/>
              Searches for all identifying numbers, including DOE contract number, report number, non-DOE contract/award numbers, or other identifying numbers such as DOI.
              <br/>
              <br/>
              <strong>
                Release Date</strong>
              <br/>
              Searches for articles that were released within a specified timeframe. Select the starting date or ending date from the drop down calendar OR type MM/DD/YYYY, e.g. 01/01/2014.
              <br/>
              <br/>
              <strong>
                Code Availability</strong>
              <br/>
              Searches the fields for Open Source, Publicly Available; Open Source, Not Publicly Available; and Closed Source.
              <br/>
              <br/>
              <strong>Licenses</strong>
              <br/>
              Searches by names of licenses.
              <br/>
              <br/>
              <strong>
                Research Organization</strong>
              <br/>
              Searches by the name(s) of the organization(s) that was funded and developed the software.
              <br/>
              <br/>
              <strong>
                Sponsoring Organization</strong>
              <br/>
              Searches the name(s) of the DOE program office(s) or other organizations that provided the funding for the development contributing to the software.
              <br/>
              <br/>
              <strong>Sort</strong><br/>
              You can choose for your results to be sorted by Relevance, Release Date (newest to oldest) or Release Date (oldest to newest).
            </div>
            <br/>
          </div>
      }, {
        anchor: 'are-there-apis',
        text: <span className='faq-page-subtitle'>Are there APIs available for DOE CODE?</span>,
        content: <p>Yes, there are lots of APIs with stable endpoints. For more information, see the&nbsp;<a title='API Documentation' target='_blank' href={api_location}>API documentation</a>.
          </p>
      }, {
        anchor: 'do-i-need-cookies',
        text: <span className='faq-page-subtitle'>Do I need to have cookies enabled to use DOE CODE?</span>,
        content: <p>Yes, you must select Accept All Cookies. Please see our&nbsp;
            <a title='Website Policies / Important Links' href='/doecode/disclaimer'>Website Policies/Important Links</a>&nbsp;for further information.</p>
      }, {
        anchor: 'more-info',
        text: <span className='faq-page-subtitle'>How can I find out more?</span>,
        content: <p>
            For additional assistance,&nbsp;
            <a title='Email doecode@osti.gov' href='mailto:doecode@osti.gov'>Contact Us</a>
          </p>
      }
    ];
    return (
      <div className="row not-so-wide-row">
        <div className="col-lg-3 col-md-1"></div>
        <div className="col-lg-6 col-md-10 col-xs-12 static-content">
          <h2 className="static-content-title">FAQs</h2>
          <br/>
          <br/> {/*The list*/}
          <ul>
            {fa_items.map((row, index) => <li key={index}>
              <a href={'/doecode/faq#' + row.anchor}>{row.text}</a>
            </li>)}
          </ul>
          <br/> {/*The actual content*/}
          {fa_items.map((row, index) => <div key={index}>
            <a name={row.anchor}></a>
            {row.text}
            <blockquote className='faq-page-blockquote'>
              {row.content}
            </blockquote>
          </div>)}
        </div>
        <div className="col-lg-3 col-md-1"></div>
      </div>
    );
  }
}
