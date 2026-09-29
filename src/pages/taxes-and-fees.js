import React from 'react';
import Layout from '@site/src/components/PageLayout';
import Link from '@docusaurus/Link';

export default function TaxesAndFees() {
    return (
        <Layout title="Taxes & Fees | Nemerald" description="How government taxes, government fees, and Nemerald provider fees are added to your base plan rate and calculated when invoices are generated.">
            <div className="bg-white px-6 py-16 sm:py-24">
                <div className="mx-auto max-w-3xl text-gray-700">
                    <h1 className="text-4xl font-semibold text-gray-900">Taxes &amp; fees</h1>
                    <p className="mt-6 text-lg leading-8">
                        Nemerald provides services to businesses only. Our published plan prices show the base subscription rate per user, per month. Applicable government taxes and fees and Nemerald provider fees are additional. Optional features may also cost extra.
                    </p>

                    <h2 className="mt-10 text-2xl font-semibold text-gray-900">Government taxes and fees</h2>
                    <p>
                        These are charges imposed by government authorities that apply to your service. They are separate from the base subscription rate and from fees imposed by Nemerald.
                    </p>

                    <h2 className="mt-10 text-2xl font-semibold text-gray-900">Nemerald provider fees</h2>
                    <p>
                        Nemerald also charges provider fees in addition to the base subscription rate. These are charges imposed by Nemerald; they are not government taxes or government-imposed fees.
                    </p>

                    <h2 className="mt-10 text-2xl font-semibold text-gray-900">How your invoice is calculated</h2>
                    <div className="my-6 rounded-2xl border-l-4 border-[#F08439] bg-gray-50 p-6">
                        <p className="mb-2 font-semibold text-gray-900">Base plan subtotal = monthly rate per user × number of users</p>
                        <p className="mb-0">Applicable government taxes and fees, Nemerald provider fees, and any optional-feature charges are added to this subtotal.</p>
                    </div>
                    <p>
                        Applicable taxes and fees are calculated when each invoice is generated. These amounts may change from month to month, so the base plan subtotal is not your total invoice amount.
                    </p>

                    <h2 className="mt-10 text-2xl font-semibold text-gray-900">Questions about your charges?</h2>
                    <p>
                        Ask our team about the taxes and fees that apply to your service. Email{' '}
                        <a href="mailto:info@nemerald.com" className="text-gray-900 underline">info@nemerald.com</a>, call{' '}
                        <a href="tel:+13109292680" className="text-gray-900 underline">+1 (310) 929 2680</a>, or use our{' '}
                        <Link to="/contacts" className="text-gray-900 underline">contact page</Link>.
                    </p>
                    <p className="mt-8">
                        <Link to="/pricing" className="font-semibold text-gray-900 underline underline-offset-4">View plans and pricing</Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}
