import { createRequestSender } from '@bigcommerce/request-sender';
import { createClient as createPaymentClient } from '@bigcommerce/bigpay-client';
import { BillingAddressActionCreator } from '../billing';
import { CartActionCreator, CartRequestSender } from '../cart';
import { CheckoutService } from '../checkout';
import { ConfigActionCreator } from '../config';
import { CountryActionCreator } from '../geography';
import { CouponActionCreator, GiftCertificateActionCreator } from '../coupon';
import { createCustomerStrategyRegistry, CustomerActionCreator } from '../customer';
import { OrderActionCreator } from '../order';
import { createPaymentStrategyRegistry, PaymentMethodActionCreator } from '../payment';
import { InstrumentActionCreator, InstrumentRequestSender } from '../payment/instrument';
import { QuoteActionCreator } from '../quote';
import { createShippingStrategyRegistry, ShippingCountryActionCreator, ShippingOptionActionCreator } from '../shipping';
import CheckoutActionCreator from './checkout-action-creator';
import createCheckoutClient from './create-checkout-client';
import createCheckoutStore from './create-checkout-store';

/**
 * @param {Object} [options]
 * @param {Config} [options.config]
 * @param {CheckoutClient} [options.client]
 * @param {string} [options.locale]
 * @return {CheckoutService}
 */
export default function createCheckoutService(options = {}) {
    const client = options.client || createCheckoutClient({ locale: options.locale });
    const store = createCheckoutStore(createInitialState({ config: options.config }), { shouldWarnMutation: options.shouldWarnMutation });
    const paymentClient = createPaymentClient({ host: options.config && options.config.bigpayBaseUrl });
    const requestSender = createRequestSender();

    return new CheckoutService(
        store,
        createCustomerStrategyRegistry(store, client),
        createPaymentStrategyRegistry(store, client, paymentClient),
        createShippingStrategyRegistry(store, client),
        new BillingAddressActionCreator(client),
        new CartActionCreator(client),
        new CheckoutActionCreator(client, new CartRequestSender(requestSender)),
        new ConfigActionCreator(client),
        new CountryActionCreator(client),
        new CouponActionCreator(client),
        new CustomerActionCreator(client),
        new GiftCertificateActionCreator(client),
        new InstrumentActionCreator(new InstrumentRequestSender(paymentClient, requestSender)),
        new OrderActionCreator(client),
        new PaymentMethodActionCreator(client),
        new QuoteActionCreator(client),
        new ShippingCountryActionCreator(client),
        new ShippingOptionActionCreator(client)
    );
}

/**
 * @private
 * @param {Object} options
 * @return {CheckoutStoreState}
 */
function createInitialState(options) {
    return {
        config: {
            data: options.config,
        },
    };
}
