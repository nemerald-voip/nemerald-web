import React from 'react';
import Layout from '@site/src/components/PageLayout';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import { ExclamationTriangleIcon, ScaleIcon } from '@heroicons/react/24/outline';

export default function TermsAndConditions() {
    useBrokenLinks().collectAnchor('billing-and-cancellation');
    return (
        <Layout title="Terms and Conditions | Nemerald">
            
            <div className="relative isolate bg-[#f9fafb] pt-24 pb-16 sm:pt-32 sm:pb-24 min-h-screen">
                
                {/* --- AMBIENT BACKGROUND GLOW --- */}
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F08439] to-[#F08439]/20 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
                </div>

                {/* --- HEADER --- */}
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center mb-16">
                    <div className="inline-flex rounded-full bg-[#F08439]/10 px-4 py-1.5 text-sm font-semibold text-gray-900 ring-1 ring-[#F08439]/15 mb-6">
                        Legal Agreements
                    </div>
                    <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        Terms and Conditions
                    </h1>
                    <p className="mt-4 text-lg text-gray-500">
                        Last updated: September 29, 2026
                    </p>
                </div>

                {/* --- LEGAL CONTENT --- */}
                <div className="mx-auto max-w-4xl px-6 lg:px-8">
                    <div className="rounded-[2rem] bg-white p-8 sm:p-12 lg:p-16 shadow-xl shadow-gray-200/50 ring-1 ring-gray-900/5 text-base leading-relaxed text-gray-600 space-y-10">
                        
                        {/* INTRODUCTION */}
                        <div>
                            <p className="text-lg font-medium text-gray-900 mb-4">
                                This Agreement governs your use of NEMERALD TECHNOLOGIES services (“Service(s)”), such as NEMERALD TECHNOLOGIES Office, NEMERALD TECHNOLOGIES Fax, the NEMERALD TECHNOLOGIES Website, and software applications (“Applications”).
                            </p>
                            <p>
                                This Agreement is between NEMERALD TECHNOLOGIES LLC and its affiliates (“NEMERALD TECHNOLOGIES”) and the legal entity you represent by signing up for any Service, using the Service, or downloading, installing, or using any Application (“You”). If You are an individual entering this Agreement on behalf of Your company, You represent and warrant that You have the authority and are competent to do so.
                            </p>
                            <p className="mt-4">
                                By using any NEMERALD TECHNOLOGIES services, you agree to abide by and comply with this agreement. Please read these terms carefully. They affect your legal rights by requiring mandatory arbitration of disputes, charging early termination fees, and limiting NEMERALD TECHNOLOGIES’s liability.
                            </p>
                        </div>

                        <hr className="border-gray-100" />

                        {/* SECTION 1: IP & RIGHTS */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. License & Intellectual Property</h2>
                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Grant of License</h3>
                            <p className="mb-4">
                                NEMERALD TECHNOLOGIES grants You a limited, personal, revocable, non-exclusive, non-sublicensable, non-assignable, non-transferable, non-resellable license and right to use the Services and Applications in strict accordance with this Agreement. All rights not expressly granted are retained by NEMERALD TECHNOLOGIES.
                            </p>
                            
                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Intellectual Property Rights</h3>
                            <p className="mb-4">
                                You acknowledge and agree that any and all patents, copyrights, trademarks, service marks, trade secrets, and all other intellectual property rights (collectively, “IP Rights”) in the Applications and Services are and shall remain the sole and exclusive property of NEMERALD TECHNOLOGIES and its licensors. You will not take any action to jeopardize, limit, or interfere with the IP Rights.
                            </p>

                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">No Resale or Modification</h3>
                            <p>
                                You agree not to sell, assign, rent, lease, distribute, export, import, act as an intermediary or provider, or otherwise grant rights to third parties with regard to the Services without our prior written consent. You agree not to undertake, cause, permit, or authorize the modification, creation of derivative works, translation, reverse engineering, decompiling, disassembling, or hacking of the Applications, Services, or Equipment.
                            </p>
                        </div>

                        {/* SECTION 2: REGISTRATION & USE POLICIES */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Registration & Acceptable Use</h2>
                            <p className="mb-4">
                                Upon signing up for the Service, You agree to provide true, accurate, current, and complete personal/business name, billing address, shipping address, 911 registered address for each device, email, and credit card information (“Registration Data”). You are solely liable for any transactions or activities by You or anyone else that occur on Your Account.
                            </p>
                            
                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Prohibited Uses</h3>
                            <p className="mb-4">You shall not use the Services for any illegal, fraudulent, improper, or abusive purpose. Prohibited uses include, but are not limited to:</p>
                            <ul className="list-disc pl-6 space-y-2 mb-6">
                                <li>Behavior that is illegal, obscene, threatening, harassing, defamatory, deceptive, fraudulent, or malicious.</li>
                                <li>Sending unsolicited messages or advertisements (“spamming”), or bulk/junk email, voice mail, SMS, or faxes.</li>
                                <li>Creating a false Caller ID identity (“ID spoofing”) or attempting to mislead others as to the origin of a communication.</li>
                                <li>Utilizing the Services in excess of normal business use, including allowing more than one user to use a single VoIP line.</li>
                                <li>Auto-dialing, predictive dialing, or trunking/forwarding your number to a PBX or key system on unlimited plans.</li>
                                <li>Using the Applications or Services to store or transmit Protected Health Information (PHI) without activating the HIPAA conduit setting.</li>
                            </ul>

                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Fair Use Policy</h3>
                            <p>
                                NEMERALD TECHNOLOGIES’s business service plans and features are for normal, reasonable business use. We reserve the right to review usage of unlimited usage plans. If we determine your usage is abusive (e.g., continuous connectivity, iterative dialing, fax blasting), we may immediately suspend your Service or transfer your service to a metered plan with applicable overage rates (at least $0.06 per minute/page).
                            </p>
                        </div>

                        {/* SECTION 3: BILLING & CANCELLATION */}
                        <div>
                            <h2 id="billing-and-cancellation" className="text-2xl font-bold text-gray-900 mb-4">3. Billing, Terms, & Cancellation</h2>

                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">14-Day Trial</h3>
                            <p className="mb-4">
                                Your 14-day trial automatically converts to paid service unless you cancel before the trial ends. Your first invoice is issued and you are first charged when the trial ends. To cancel during the trial and avoid service charges, send a written request to <a href="mailto:billing@nemerald.com" className="text-gray-900 font-semibold underline underline-offset-4">billing@nemerald.com</a> before your trial ends.
                            </p>
                            <p className="mb-4">
                                Cancellation before the trial ends is not subject to the thirty (30) day notice requirement or an early termination charge. These trial cancellation terms take precedence over the paid-service renewal, notice, early-termination, and refund provisions below.
                            </p>

                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">How to Cancel Services</h3>
                            <p className="mb-4">
                                Send your written cancellation or non-renewal request by email to <a href="mailto:billing@nemerald.com" className="text-gray-900 font-semibold underline underline-offset-4">billing@nemerald.com</a>. A telephone call is not required. Please identify your business, account, and the services you want to cancel so we can match the request to your account.
                            </p>

                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Paid Month-to-Month Service</h3>
                            <p className="mb-4">
                                Paid month-to-month service renews monthly. Either party may cancel it with thirty (30) days’ written notice. Service charges remain payable during the notice period. There is no separate early termination charge for month-to-month service. The notice requirement applies only after paid service begins; it does not apply to cancellation before the trial ends.
                            </p>

                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Fixed-Term Service and Renewal</h3>
                            <p className="mb-4">
                                Some special-pricing agreements have a one-, two-, or three-year service commitment, as specified in your service order. Paying monthly does not make a fixed-term agreement month to month. After paid service begins, a fixed-term agreement renews for successive terms of the same length unless either party gives written notice of non-renewal at least thirty (30) days before the current term ends, or the service order specifies otherwise.
                            </p>

                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Early Termination of Fixed-Term Service</h3>
                            <p className="mb-4">
                                If you end paid fixed-term service before the initial or renewal term expires, the early termination charge is 100% of the Monthly Service Fee for the canceled services multiplied by the number of months remaining in that term, unless your service order or applicable law provides otherwise. Amounts already paid or separately billed for the same remaining service period are deducted from this charge to avoid duplicate billing. Giving thirty (30) days’ notice does not waive the remaining fixed-term commitment. This charge does not apply to month-to-month service or cancellation before the trial ends.
                            </p>

                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Refunds and Billing Corrections</h3>
                            <p className="mb-4">
                                Valid paid-service charges already billed are non-refundable, and unused portions of an already-billed service period are not prorated upon cancellation. This rule does not override the trial cancellation terms above, correction of billing errors, refunds required by applicable law, refunds expressly agreed in writing, or equipment returns covered by Section 4. Send billing questions or requests to correct an error to <a href="mailto:billing@nemerald.com" className="text-gray-900 font-semibold underline underline-offset-4">billing@nemerald.com</a>.
                            </p>

                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Equipment Installments</h3>
                            <p className="mb-4">
                                Equipment purchased on a separate installment agreement, including a 24-month payment plan, is separate from your service subscription. Canceling service does not by itself cancel that purchase or its remaining payment obligations. The equipment agreement and the return provisions in Section 4 govern any remaining balance or eligible return.
                            </p>

                            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-2">Late Payments</h3>
                            <p>
                                Failure to pay in full within 30 days will result in immediate account suspension. Reactivation requires the balance paid in full plus a $35 reconnection fee. Late fees of $30 or 5% per month may apply.
                            </p>
                        </div>

                        {/* SECTION 4: EQUIPMENT & PORTING */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Equipment & Number Porting</h2>
                            <p className="mb-4">
                                <strong>Equipment Returns:</strong> If You cancel Your Service within ninety (90) days from the date of hardware purchase, You may return the hardware for a full refund (shipping paid by you), provided it is fully functional and includes all original components. Missing or damaged items may incur a $30 fee per item. No returns are accepted after 90 days.
                            </p>
                            <p className="mb-4">
                                <strong>Number Porting:</strong> We will use reasonable efforts to facilitate number transfers. However, number porting depends on the cooperation of third parties outside of our control. We are not liable for the failure or delay of any third party to cooperate in porting.
                            </p>
                            <p>
                                <strong>Release of Numbers:</strong> In the event of any account termination or cancellation, all telephone numbers associated with your account may be released. It is your responsibility to work with a third-party provider to port out numbers prior to termination.
                            </p>
                        </div>

                        {/* SECTION 5: 911 E-SERVICES (HIGH VISIBILITY UI) */}
                        <div className="bg-[#fffaf5] border-l-4 border-[#F08439] rounded-r-2xl p-6 sm:p-8 my-10 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <ExclamationTriangleIcon className="h-8 w-8 text-gray-900" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-0">5. Emergency Services & 911 Dialing</h2>
                            </div>
                            <p className="text-gray-900 font-semibold mb-4">
                                NEMERALD TECHNOLOGIES 911 dialing service operates differently than traditional 911. You are advised to maintain an alternative means of accessing traditional 911 services, such as a cellular phone.
                            </p>
                            <ul className="list-disc pl-6 space-y-3 text-sm text-gray-700">
                                <li><strong>Location Registration:</strong> Because Your address does not necessarily correspond with Your telephone number, You must provide NEMERALD TECHNOLOGIES with the exact street address where You will be using the Service (“Registered Location”). If you move your equipment, you must update this address immediately, or emergency personnel may be dispatched to the wrong location.</li>
                                <li><strong>Internet & Power Outages:</strong> If your broadband connection fails or there is an electrical power outage, your VoIP service (including 911 capabilities) will not function until power and connectivity are restored.</li>
                                <li><strong>Network Congestion:</strong> 911 calls made via VoIP may be routed to a general telephone number for the local emergency service provider rather than a dedicated 911 dispatcher, which may result in longer answer times or busy signals.</li>
                                <li><strong>E911 Service Fee:</strong> Customers required to subscribe to E911 service will be subject to a monthly E911 Service Fee to reimburse direct costs incurred by NEMERALD TECHNOLOGIES in providing automatic location information and maintaining databases.</li>
                            </ul>
                            <p className="mt-6 text-sm font-semibold text-gray-900">
                                You agree to defend, indemnify, and hold harmless NEMERALD TECHNOLOGIES and its affiliates from any claims, losses, or damages arising out of your failure to correctly activate 911 calling or update your Registered Location.
                            </p>
                        </div>

                        {/* SECTION 6: WARRANTIES & LIABILITY */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Warranties & Limitation of Liability</h2>
                            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 text-sm space-y-4">
                                <p className="uppercase font-bold text-gray-900 text-xs tracking-wider">Disclaimer of Warranties</p>
                                <p>
                                    THE SERVICES ARE PROVIDED “AS IS” AND “AS AVAILABLE”. NEMERALD TECHNOLOGIES MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. NEMERALD TECHNOLOGIES makes no warranty on up-time, response times, latency, mean-time between failures, or quality of voice/fax communications.
                                </p>
                                <p className="uppercase font-bold text-gray-900 text-xs tracking-wider mt-6">Limitation of Liability</p>
                                <p>
                                    IN NO EVENT SHALL NEMERALD TECHNOLOGIES BE LIABLE FOR SPECIAL, EXEMPLARY, INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES OF ANY KIND, WHETHER ARISING UNDER CONTRACT, WARRANTY, TORT, OR ANY OTHER THEORY OF LIABILITY. NEMERALD TECHNOLOGIES’s total liability for any and all damages shall be limited and capped in their entirety to the monthly fees charged to you during the one (1) month immediately prior to the date the claim first occurred.
                                </p>
                            </div>
                        </div>

                        {/* SECTION 7: DISPUTE RESOLUTION */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <ScaleIcon className="h-7 w-7 text-gray-900" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-0">7. Dispute Resolution & Arbitration</h2>
                            </div>
                            <p className="mb-4">
                                In the event of any dispute, claim, question, or disagreement, You and NEMERALD TECHNOLOGIES shall first use reasonable best efforts to settle the dispute through good-faith consultation and negotiation.
                            </p>
                            <p className="mb-4">
                                You agree that any Disputes shall be adjudicated in the state and federal courts of the State of California, U.S.A. Venue shall be the Superior Court of California, County of Los Angeles. This Agreement shall be governed by and construed under the laws of the State of California.
                            </p>
                            <p className="font-semibold text-gray-900 mb-2">Optional Arbitration & Class Action Waiver</p>
                            <p className="mb-4 text-sm">
                                For any Disputes involving $10,000 or less, either party may choose to resolve such Dispute through binding, non-appearance-based arbitration. 
                            </p>
                            <p className="text-sm font-bold text-gray-900 uppercase tracking-wide bg-gray-100 p-4 rounded-lg">
                                YOU AND NEMERALD TECHNOLOGIES AGREE THAT YOU MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. By entering into this agreement, you waive the right to a trial by jury.
                            </p>
                        </div>

                        {/* FOOTER OF LEGAL DOC */}
                        <div className="pt-8 border-t border-gray-200 mt-12 text-sm text-gray-500">
                            <p className="mb-4">
                                We may change the terms of this Agreement from time to time upon delivery of electronic or written notices to You. Your continued use of the Services after the effective date of a change constitutes your acceptance of the updated terms.
                            </p>
                            <p className="mb-0">
                                <strong>California Consumer Notice:</strong> Under California Civil Code Section 1789.3, California users receive the following notice: The Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs may be contacted in writing at 1020 N Street, #501, Sacramento, California 95814, or by telephone at 916-445-1254.
                            </p>
                        </div>

                    </div>
                </div>
            </div>

        </Layout>
    );
}
