import React, { Component } from 'react';
import NavBar from './navbar'
import BottomNavBar from './BottomNavbar'
import { Accordion, AccordionTab } from 'primereact/accordion';
class Privacy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerId: this.props.match.params.customerId,
            name: this.props.match.params.name,
        }
        this.url = '';
    }
    render() {
        return (
            <div style={{}}>
                <NavBar customerId={this.state.customerId} name={this.state.name} home={false} />
                <div className="d-none d-sm-block">
                    <div className="container jumbotron" style={{ marginTop: 30, marginBottom: 30 }}>
                        <div className="row" style={{ minHeight: "400px", padding: 10 }}>
                            <div className="col-md-6">
                                <div className="display-3 text text-dark" style={{ marginTop: "25%" }}>
                                    Privacy Policy
                                    </div>
                            </div>
                            <div className="col-md-2"></div>
                            <div className="col-md-4" >
                                <img src={require("../assets/pr.svg")} alt="none" style={{ height: "322px", marginTop: "15%" }} />
                            </div>
                        </div>

                        <div className="row text-justify" style={{ marginBottom: 50, minHeight: 400 }}>
                            <div className="text text-dark">
                                ZiggyEats Media Private Limited and/or its affiliates ("ZiggyEats," the "Company," "we," "us," and "our,") respect your privacy and is committed to protecting it through its compliance with its privacy policies. This policy describes:
</div>
                            <ul>
                                <li>
                                    the types of information that ZiggyEats may collect from you when you access or use its websites, applications and other online services (collectively, referred as "Services"); and
</li>
                                <li>
                                    its practices for collecting, using, maintaining, protecting and disclosing that information.
</li>
                            </ul>
                            <div>
                                This policy applies only to the information ZiggyEats collects through its Services, in email, text and other electronic communications sent through or in connection with its Services.
<br /><br />
                                This policy DOES NOT apply to information that you provide to, or that is collected by, any third-party, such as restaurants at which you make reservations and/or pay through ZiggyEats Services and social networks that you use in connection with its Services. ZiggyEats encourages you to consult directly with such third-parties about their privacy practices.
<br /><br />
                                Please read this policy carefully to understand ZiggyEats policies and practices regarding your information and how ZiggyEats will treat it. By accessing or using its Services and/or registering for an account with ZiggyEats, you agree to this privacy policy and you are consenting to ZiggyEats collection, use, disclosure, retention, and protection of your personal information as described here. If you do not provide the information ZiggyEats requires, ZiggyEats may not be able to provide all of its Services to you.
<br /><br />
                                If you reside in a country within the European Union/European Economic Area (EAA), ZiggyEats Media Portugal, Unipessoal LDA , located at Avenida 24 de Julho, N 102-E, 1200-870, Lisboa, Portugal, will be the controller of your personal data provided to, or collected by or for, or processed in connection with our Services;
<br /><br />
                                If you reside in United States of America, ZiggyEats USA LLC, located at 601 S. Cedar Street, Suite 111, Charlotte, NC 28202 will be the controller of your personal data provided to, or collected by or for, or processed in connection with our Services;
<br /><br />
                                If you reside in any other part of the world, ZiggyEats Media Private Limited, located at Ground Floor, Tower C, Vipul Tech Square, Sector 43, Golf Course Road, Gurugram - 122009, Haryana, India will be the controller of your personal data provided to, or collected by or for, or processed in connection with our Services.
<br /><br />
                                Your data controller is responsible for the collection, use, disclosure, retention, and protection of your personal information in accordance with its privacy standards as well as any applicable national laws. Your data controller may transfer data to other members of ZiggyEats as described in this Privacy Policy. ZiggyEats may process and retain your personal information on its servers in India where its data centers are located, and/or on the servers of its third parties (in or outside India), having contractual relationships with ZiggyEats.
<br /><br />
                                This policy may change from time to time, your continued use of ZiggyEats Services after it makes any change is deemed to be acceptance of those changes, so please check the policy periodically for updates.
</div>
                            <Accordion>
                                <AccordionTab header="The information we collect and how we use it">
                                    <div>ZiggyEats Media Private Limited ("ZiggyEats," the "Company," "we," "us," and "our”) collects several types of information from and about users of our Services, including:</div>
                                    <ul>
                                        <li>
                                            Your Personal Information("PI") - Personal Information is the information that can be associated with a specific person and could be used to identify that specific person whether from that data, or from the data and other information that we have, or is likely to have access to. We do not consider personal information to include information that has been made anonymous or aggregated so that it can no longer be used to identify a specific person, whether in combination with other information or otherwise.
</li>
                                        <li>
                                            Information about your internet connection, the equipment you use to access our Services and your usage details.
</li>
                                    </ul>
                                    <div>We collect this information:</div>
                                    <ul>
                                        <li>
                                            directly from you when you provide it to us; and/or
</li>
                                        <li>
                                            automatically as you navigate through our Services (information collected automatically may include usage details, IP addresses and information collected through cookies, web beacons and other tracking technologies).
</li>
                                    </ul>
                                </AccordionTab>
                                <AccordionTab header="Information about Your Friends">
                                    <div>You have the option to request your friends to join the Services by providing their contact information. If you request a friend to join and connect with you on the Services, we will only use your friend's contact information to process your request.</div>
                                </AccordionTab>
                                <AccordionTab header="Third party links and services">
                                    <div>The Services may contain links to third-party websites. Your use of these features may result in the collection, processing or sharing of information about you, depending on the feature. Please be aware that we are not responsible for the content or privacy practices of other websites or services which may be linked on our services. We do not endorse or make any representations about third-party websites or services. Our Privacy Policy does not cover the information you choose to provide to or that is collected by these third parties. We strongly encourage you to read such third parties' privacy policies.</div>
                                </AccordionTab>

                                <AccordionTab header="Changes to this privacy policy">
                                    <div>We reserve the right to amend this Privacy Policy from time to time to reflect changes in the law, our data collection and use practices, the features of our services, or advances in technology. Please check this page periodically for changes. Use of information we collect is subject to the Privacy Policy in effect at the time such information is used. If we make any material changes to this Privacy Policy, we will post the changes here. Please review the changes carefully. Your continued use of the Services following the posting of changes to this Privacy Policy will constitute your consent and acceptance of those changes.</div>
                                </AccordionTab>
                            </Accordion>
                        </div>
                    </div>
                </div>
                <div className="d-block d-sm-none">
                    <div className="container jumbotron" style={{ margin: 10 }}>
                        <div className="row" style={{ padding: 15 }}>
                            <div className="col-xs-12">
                                <div className="display-4 text text-dark" style={{ }}>
                                    Privacy Policy
</div>
                            </div>
                            <div className="col-xs-12" >
                                <img src={require("../assets/pr.svg")} alt="mope" style={{ height: "322px" }} />
                            </div>
                        </div>

                        <div className="row text-justify" style={{ margin: 10 }}>
                            <div className="text text-dark">
                                ZiggyEats Media Private Limited and/or its affiliates ("ZiggyEats," the "Company," "we," "us," and "our,") respect your privacy and is committed to protecting it through its compliance with its privacy policies. This policy describes:
</div>
                            <ul>
                                <li>
                                    the types of information that ZiggyEats may collect from you when you access or use its websites, applications and other online services (collectively, referred as "Services"); and
</li>
                                <li>
                                    its practices for collecting, using, maintaining, protecting and disclosing that information.
</li>
                            </ul>
                            <div>
                                This policy applies only to the information ZiggyEats collects through its Services, in email, text and other electronic communications sent through or in connection with its Services.
<br /><br />
                                This policy DOES NOT apply to information that you provide to, or that is collected by, any third-party, such as restaurants at which you make reservations and/or pay through ZiggyEats Services and social networks that you use in connection with its Services. ZiggyEats encourages you to consult directly with such third-parties about their privacy practices.
<br /><br />
                                Please read this policy carefully to understand ZiggyEats policies and practices regarding your information and how ZiggyEats will treat it. By accessing or using its Services and/or registering for an account with ZiggyEats, you agree to this privacy policy and you are consenting to ZiggyEats collection, use, disclosure, retention, and protection of your personal information as described here. If you do not provide the information ZiggyEats requires, ZiggyEats may not be able to provide all of its Services to you.
<br /><br />
                                If you reside in a country within the European Union/European Economic Area (EAA), ZiggyEats Media Portugal, Unipessoal LDA , located at Avenida 24 de Julho, N 102-E, 1200-870, Lisboa, Portugal, will be the controller of your personal data provided to, or collected by or for, or processed in connection with our Services;
<br /><br />
                                If you reside in United States of America, ZiggyEats USA LLC, located at 601 S. Cedar Street, Suite 111, Charlotte, NC 28202 will be the controller of your personal data provided to, or collected by or for, or processed in connection with our Services;
<br /><br />
                                If you reside in any other part of the world, ZiggyEats Media Private Limited, located at Ground Floor, Tower C, Vipul Tech Square, Sector 43, Golf Course Road, Gurugram - 122009, Haryana, India will be the controller of your personal data provided to, or collected by or for, or processed in connection with our Services.
<br /><br />
                                Your data controller is responsible for the collection, use, disclosure, retention, and protection of your personal information in accordance with its privacy standards as well as any applicable national laws. Your data controller may transfer data to other members of ZiggyEats as described in this Privacy Policy. ZiggyEats may process and retain your personal information on its servers in India where its data centers are located, and/or on the servers of its third parties (in or outside India), having contractual relationships with ZiggyEats.
<br /><br />
                                This policy may change from time to time, your continued use of ZiggyEats Services after it makes any change is deemed to be acceptance of those changes, so please check the policy periodically for updates.
</div>
                            <Accordion style={{width:"320px"}}>
                                <AccordionTab header="The information we collect">
                                <div style={{padding:5}}>
                                    <div>
                                        ZiggyEats Media Private Limited ("ZiggyEats," the "Company," "we," "us," and "our”) collects several types of information from and about users of our Services, including:</div>
                                    <ul>
                                        <li>
                                            Your Personal Information("PI") - Personal Information is the information that can be associated with a specific person and could be used to identify that specific person whether from that data, or from the data and other information that we have, or is likely to have access to. We do not consider personal information to include information that has been made anonymous or aggregated so that it can no longer be used to identify a specific person, whether in combination with other information or otherwise.
</li>
                                        <li>
                                            Information about your internet connection, the equipment you use to access our Services and your usage details.
</li>
                                    </ul>
                                    <div>We collect this information:</div>
                                    <ul>
                                        <li>
                                            directly from you when you provide it to us; and/or
</li>
                                        <li>
                                            automatically as you navigate through our Services (information collected automatically may include usage details, IP addresses and information collected through cookies, web beacons and other tracking technologies).
</li>
                                    </ul>
                                    </div>
                                </AccordionTab>
                                <AccordionTab header="Information about Your Friends">
                                <div style={{padding:5}}>
                                    <div>You have the option to request your friends to join the Services by providing their contact information. If you request a friend to join and connect with you on the Services, we will only use your friend's contact information to process your request.</div>
                                    </div>
                                </AccordionTab>
                                <AccordionTab header="Third party links and services">
                                <div style={{padding:5}}>
                                    <div>The Services may contain links to third-party websites. Your use of these features may result in the collection, processing or sharing of information about you, depending on the feature. Please be aware that we are not responsible for the content or privacy practices of other websites or services which may be linked on our services. We do not endorse or make any representations about third-party websites or services. Our Privacy Policy does not cover the information you choose to provide to or that is collected by these third parties. We strongly encourage you to read such third parties' privacy policies.</div>
                                    </div>
                                </AccordionTab>
                                <AccordionTab header="Changes to this privacy policy">
                                <div style={{padding:5}}>
                                    <div>We reserve the right to amend this Privacy Policy from time to time to reflect changes in the law, our data collection and use practices, the features of our services, or advances in technology. Please check this page periodically for changes. Use of information we collect is subject to the Privacy Policy in effect at the time such information is used. If we make any material changes to this Privacy Policy, we will post the changes here. Please review the changes carefully. Your continued use of the Services following the posting of changes to this Privacy Policy will constitute your consent and acceptance of those changes.</div>
                                    </div>
                                </AccordionTab>
                            </Accordion>
                        </div>
                    </div>
                </div>
                <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
            </div>
        )
    }
}
export default Privacy;
