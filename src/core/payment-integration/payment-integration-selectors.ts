import { BillingAddress } from '../../billing';
import { Cart } from '../../cart';
import { Checkout } from '../../checkout';
import { StoreConfig } from '../../config';
import { Customer } from '../../customer';
import { Order } from '../../order';
import { PaymentMethod } from '../../payment';
import { CardInstrument } from '../../payment/instrument';
import { Consignment, ShippingAddress } from '../../shipping';

export default interface PaymentIntegrationSelectors {
    getBillingAddress(): BillingAddress | undefined;
    getBillingAddressOrThrow(): BillingAddress;

    getCart(): Cart | undefined;
    getCartOrThrow(): Cart;

    getCheckout(): Checkout | undefined;
    getCheckoutOrThrow(): Checkout;

    getStoreConfig(): StoreConfig | undefined;
    getStoreConfigOrThrow(): StoreConfig;

    getConsignments(): Consignment[] | undefined;
    getConsignmentsOrThrow(): Consignment[];

    getCustomer(): Customer | undefined;
    getCustomerOrThrow(): Customer;

    getCardInstrument(instrumentId: string): CardInstrument | undefined;
    getCardInstrumentOrThrow(instrumentId: string): CardInstrument;

    getOrder(): Order | undefined;
    getOrderOrThrow(): Order;

    getPaymentToken(): string | undefined;
    getPaymentTokenOrThrow(): string;

    getPaymentId(): { providerId: string; gatewayId?: string } | undefined;
    getPaymentIdOrThrow(): { providerId: string; gatewayId?: string };

    getPaymentStatus(): string | undefined;
    getPaymentStatusOrThrow(): string;

    getPaymentRedirectUrl(): string | undefined;
    getPaymentRedirectUrlOrThrow(): string;

    getPaymentMethod(methodId: string, gatewayId?: string): PaymentMethod | undefined;
    getPaymentMethodOrThrow(methodId: string, gatewayId?: string): PaymentMethod;

    getShippingAddress(): ShippingAddress | undefined;
    getShippingAddressOrThrow(): ShippingAddress;

    isPaymentDataRequired(useStoreCredit?: boolean): boolean;
    isPaymentMethodInitialized(methodId: string): boolean;
}
