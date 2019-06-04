import React, { Component } from 'react';

import NavBar from './navbar'
import BottomNavBar from './BottomNavbar'

class LocationList extends Component {
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

                    <div className="container jumbotron" style={{ marginTop: 30, marginBottom: 30 }} >
                        <div className="row" style={{ padding: "10px", textAlign: "justify" }}>
                            <div className="display-3 text text-dark">Terms of Service</div>
                            <div className="text text-dark">
                                <h4>I. Acceptance of terms</h4>
                                Thank you for using ZiggyEats. These Terms of Service (the "Terms") are intended to make you aware of your legal rights and responsibilities with respect to your access to and use of the ZiggyEats website at www.ziggyeats.com (the "Site") and any related mobile or software applications ("ZiggyEats Platform") including but not limited to delivery of information via the website whether existing now or in the future that link to the Terms (collectively, the "Services").
<br /><br />
                                <b>These Terms are effective for all existing and future ZiggyEats users, including but without limitation to users having access to 'restaurant business page' to manage their claimed business listings.</b>
                                <br /><br />
                                Please read these Terms carefully. By accessing or using the ZiggyEats Platform, you are agreeing to these Terms and concluding a legally binding contract with ZiggyEats Media Pvt. Ltd. and/or its affiliates or, if you are in the United States, with ZiggyEats USA, LLC and/or its affiliates (hereinafter collectively referred to as "ZiggyEats"). You may not use the Services if you do not accept the Terms or are unable to be bound by the Terms. Your use of the ZiggyEats Platform is at your own risk, including the risk that you might be exposed to content that is objectionable, or otherwise inappropriate.
<br /><br />
                                In order to use the Services, you must first agree to the Terms. You can accept the Terms by:
<ul>
                                    <li>
                                        Clicking to accept or agree to the Terms, where it is made available to you by ZiggyEats in the user interface for any particular Service; or
</li>
                                    <li>
                                        Actually using the Services. In this case, you understand and agree that ZiggyEats will treat your use of the Services as acceptance of the Terms from that point onwards.
</li>
                                </ul>
                            </div>

                            <div className="text text-dark">
                                <h4>II. Definitions</h4>
                                <h6>User</h6>
                                "User" or "You" or "Your" refers to you, as a user of the Services. A user is someone who accesses or uses the Services for the purpose of sharing, displaying, hosting, publishing, transacting, or uploading information or views or pictures and includes other persons jointly participating in using the Services including without limitation a user having access to 'restaurant business page' to manage claimed business listings or otherwise.
<br /><br />
                                <h6>Content</h6>
                                "Content" will include (but is not limited to) reviews, images, photos, audio, video, location data, nearby places, and all other forms of information or data. "Your content" or "User Content" means content that you upload, share or transmit to, through or in connection with the Services, such as likes, ratings, reviews, images, photos, messages, profile information, and any other materials that you publicly display or displayed in your account profile. "ZiggyEats Content" means content that ZiggyEats creates and make available in connection with the Services including, but not limited to, visual interfaces, interactive features, graphics, design, compilation, computer code, products, software, aggregate ratings, reports and other usage-related data in connection with activities associated with your account and all other elements and components of the Services excluding Your Content and Third Party Content. "Third Party Content" means content that comes from parties other than ZiggyEats or its users and is available on the Services.
<br /><br />
                                <h6>Restaurant(s)</h6>
                                <div>"Restaurant" means the restaurants listed on ZiggyEats and any related mobile or software applications of ZiggyEats.</div>
                            </div>

                            <div className="text text-dark">
                                <h4>III. Eligibility to use the services</h4>
                                <ol>
                                    <li>You hereby represent and warrant that you are at least eighteen (18) years of age or above and are fully able and competent to understand and agree the terms, conditions, obligations, affirmations, representations, and warranties set forth in these Terms.</li>
                                    <li>Compliance with Laws. You are in compliance with all laws and regulations in the country in which you live when you access and use the Services. You agree to use the Services only in compliance with these Terms and applicable law, and in a manner that does not violate our legal rights or those of any third party(ies).</li>
                                </ol>
                            </div>

                            <div className="text text-dark">
                                <h4>IV. Changes to the terms</h4>
                                ZiggyEats may vary or amend or change or update these Terms, from time to time entirely at its own discretion. You shall be responsible for checking these Terms from time to time and ensure continued compliance with these Terms. Your use of ZiggyEats Platform after any such amendment or change in the Terms shall be deemed as your express acceptance to such amended/changed terms and you also agree to be bound by such changed/amended Terms.
</div>

                            <div className="text text-dark">
                                <h4>V. Translation of the terms</h4>
                                ZiggyEats may provide a translation of the English version of the Terms into other languages. You understand and agree that any translation of the Terms into other languages is only for your convenience and that the English version shall govern the terms of your relationship with ZiggyEats. Furthermore, if there are any inconsistencies between the English version of the Terms and its translated version, the English version of the Terms shall prevail over others.
</div>

                            <div className="text text-dark">
                                <h4>VI. User feedback</h4>
                                If you share or send any ideas, suggestions, changes or documents regarding ZiggyEat's existing business ("Feedback"), you agree that (i) your Feedback does not contain the confidential, secretive or proprietary information of third parties, (ii) ZiggyEats is under no obligation of confidentiality with respect to such Feedback, and shall be free to use the Feedback on an unrestricted basis (iii) ZiggyEats may have already received similar Feedback from some other user or it may be under consideration or in development, and (iv) By providing the Feedback, you grant us a binding, non-exclusive, royalty-free, perpetual, global license to use, modify, develop, publish, distribute and sublicense the Feedback, and you irrevocably waive, against ZiggyEats and its users any claims/assertions, whatsoever of any nature, with regard to such Feedback.
<br /><br />
                                Please provide only specific Feedback on ZiggyEat's existing products or marketing strategies; do not include any ideas that ZiggyEat's policy will not permit it to accept or consider.
<br /><br />
                                Notwithstanding the abovementioned clause, ZiggyEats or any of its employees do not accept or consider unsolicited ideas, including ideas for new advertising campaigns, new promotions, new or improved products or technologies, product enhancements, processes, materials, marketing plans or new product names. Please do not submit any unsolicited ideas, original creative artwork, suggestions or other works ("Submissions") in any form to ZiggyEats or any of its employees. The purpose of this policy is to avoid potential misunderstandings or disputes when ZiggyEat's products or marketing strategies might seem similar to ideas submitted to ZiggyEats. If, despite our request to not send us your ideas, you still submit them, then regardless of what your letter says, the following terms shall apply to your Submissions.
<br /><br />
                                Terms of Idea Submission
<br /><br />
                                You agree that: (1) your Submissions and their Contents will automatically become the property of ZiggyEats, without any compensation to you; (2) ZiggyEats may use or redistribute the Submissions and their contents for any purpose and in any way; (3) there is no obligation for ZiggyEats to review the Submission; and (4) there is no obligation to keep any Submissions confidential.
</div>
                        </div>
                    </div>
                </div>

                <div className="d-block d-sm-none">
                    <div className="container jumbotron" style={{ margin:5, marginTop:15, marginBottom:15 }} >
                        <div className="row" style={{ padding: "10px" }}>
                            <div className="display-4 text text-dark">Terms of Service</div>
                            <div className="text text-dark text-justify" style={{padding:5}}>
                                <h4>I. Acceptance of terms</h4>
                                Thank you for using ZiggyEats. These Terms of Service (the "Terms") are intended to make you aware of your legal rights and responsibilities with respect to your access to and use of the ZiggyEats website at www.ziggyeats.com (the "Site") and any related mobile or software applications ("ZiggyEats Platform") including but not limited to delivery of information via the website whether existing now or in the future that link to the Terms (collectively, the "Services").
<br /><br />
                                <b>These Terms are effective for all existing and future ZiggyEats users, including but without limitation to users having access to 'restaurant business page' to manage their claimed business listings.</b>
                                <br /><br />
                                Please read these Terms carefully. By accessing or using the ZiggyEats Platform, you are agreeing to these Terms and concluding a legally binding contract with ZiggyEats Media Pvt. Ltd. and/or its affiliates or, if you are in the United States, with ZiggyEats USA, LLC and/or its affiliates (hereinafter collectively referred to as "ZiggyEats"). You may not use the Services if you do not accept the Terms or are unable to be bound by the Terms. Your use of the ZiggyEats Platform is at your own risk, including the risk that you might be exposed to content that is objectionable, or otherwise inappropriate.
<br /><br />
                                In order to use the Services, you must first agree to the Terms. You can accept the Terms by:
<ul>
                                    <li>
                                        Clicking to accept or agree to the Terms, where it is made available to you by ZiggyEats in the user interface for any particular Service; or
</li>
                                    <li>
                                        Actually using the Services. In this case, you understand and agree that ZiggyEats will treat your use of the Services as acceptance of the Terms from that point onwards.
</li>
                                </ul>
                            </div>

                            <div className="text text-dark text-justify" style={{padding:5}}>
                                <h4>II. Definitions</h4>
                                <h6>User</h6>
                                "User" or "You" or "Your" refers to you, as a user of the Services. A user is someone who accesses or uses the Services for the purpose of sharing, displaying, hosting, publishing, transacting, or uploading information or views or pictures and includes other persons jointly participating in using the Services including without limitation a user having access to 'restaurant business page' to manage claimed business listings or otherwise.
<br /><br />
                                <h6>Content</h6>
                                "Content" will include (but is not limited to) reviews, images, photos, audio, video, location data, nearby places, and all other forms of information or data. "Your content" or "User Content" means content that you upload, share or transmit to, through or in connection with the Services, such as likes, ratings, reviews, images, photos, messages, profile information, and any other materials that you publicly display or displayed in your account profile. "ZiggyEats Content" means content that ZiggyEats creates and make available in connection with the Services including, but not limited to, visual interfaces, interactive features, graphics, design, compilation, computer code, products, software, aggregate ratings, reports and other usage-related data in connection with activities associated with your account and all other elements and components of the Services excluding Your Content and Third Party Content. "Third Party Content" means content that comes from parties other than ZiggyEats or its users and is available on the Services.
<br /><br />
                                <h6>Restaurant(s)</h6>
                                <div>"Restaurant" means the restaurants listed on ZiggyEats and any related mobile or software applications of ZiggyEats.</div>
                            </div>

                            <div className="text text-dark text-justify" style={{padding:5}}>
                                <h4>III. Eligibility to use the services</h4>
                                <ol>
                                    <li>You hereby represent and warrant that you are at least eighteen (18) years of age or above and are fully able and competent to understand and agree the terms, conditions, obligations, affirmations, representations, and warranties set forth in these Terms.</li>
                                    <li>Compliance with Laws. You are in compliance with all laws and regulations in the country in which you live when you access and use the Services. You agree to use the Services only in compliance with these Terms and applicable law, and in a manner that does not violate our legal rights or those of any third party(ies).</li>
                                </ol>
                            </div>

                            <div className="text text-dark text-justify" style={{padding:5}}>
                                <h4>IV. Changes to the terms</h4>
                                ZiggyEats may vary or amend or change or update these Terms, from time to time entirely at its own discretion. You shall be responsible for checking these Terms from time to time and ensure continued compliance with these Terms. Your use of ZiggyEats Platform after any such amendment or change in the Terms shall be deemed as your express acceptance to such amended/changed terms and you also agree to be bound by such changed/amended Terms.
</div>

                            <div className="text text-dark text-justify" style={{padding:5}}>
                                <h4>V. Translation of the terms</h4>
                                ZiggyEats may provide a translation of the English version of the Terms into other languages. You understand and agree that any translation of the Terms into other languages is only for your convenience and that the English version shall govern the terms of your relationship with ZiggyEats. Furthermore, if there are any inconsistencies between the English version of the Terms and its translated version, the English version of the Terms shall prevail over others.
</div>

                            <div className="text text-dark text-justify" style={{padding:5}}>
                                <h4>VI. User feedback</h4>
                                If you share or send any ideas, suggestions, changes or documents regarding ZiggyEat's existing business ("Feedback"), you agree that (i) your Feedback does not contain the confidential, secretive or proprietary information of third parties, (ii) ZiggyEats is under no obligation of confidentiality with respect to such Feedback, and shall be free to use the Feedback on an unrestricted basis (iii) ZiggyEats may have already received similar Feedback from some other user or it may be under consideration or in development, and (iv) By providing the Feedback, you grant us a binding, non-exclusive, royalty-free, perpetual, global license to use, modify, develop, publish, distribute and sublicense the Feedback, and you irrevocably waive, against ZiggyEats and its users any claims/assertions, whatsoever of any nature, with regard to such Feedback.
<br /><br />
                                Please provide only specific Feedback on ZiggyEat's existing products or marketing strategies; do not include any ideas that ZiggyEat's policy will not permit it to accept or consider.
<br /><br />
                                Notwithstanding the abovementioned clause, ZiggyEats or any of its employees do not accept or consider unsolicited ideas, including ideas for new advertising campaigns, new promotions, new or improved products or technologies, product enhancements, processes, materials, marketing plans or new product names. Please do not submit any unsolicited ideas, original creative artwork, suggestions or other works ("Submissions") in any form to ZiggyEats or any of its employees. The purpose of this policy is to avoid potential misunderstandings or disputes when ZiggyEat's products or marketing strategies might seem similar to ideas submitted to ZiggyEats. If, despite our request to not send us your ideas, you still submit them, then regardless of what your letter says, the following terms shall apply to your Submissions.
<br /><br />
                                Terms of Idea Submission
<br /><br />
                                You agree that: (1) your Submissions and their Contents will automatically become the property of ZiggyEats, without any compensation to you; (2) ZiggyEats may use or redistribute the Submissions and their contents for any purpose and in any way; (3) there is no obligation for ZiggyEats to review the Submission; and (4) there is no obligation to keep any Submissions confidential.
</div>
                        </div>
                    </div>
                </div>
                <BottomNavBar customerId={this.state.customerId} name={this.state.name} />
            </div>
        )
    }
}
export default LocationList;