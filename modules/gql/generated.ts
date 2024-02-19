import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Money: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type ActiveOrderResult = NoActiveOrderError | Order;

export type AddItemToOrderInput = {
  productVariantId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type AddItemsToOrderInput = {
  items: Array<AddItemToOrderInput>;
};

export type AddPaymentToOrderResult = IneligiblePaymentMethodError | NoActiveOrderError | Order | OrderPaymentStateError | OrderStateTransitionError | PaymentDeclinedError | PaymentFailedError;

export type Address = Node & {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  country: Country;
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']['output']>;
  defaultShippingAddress?: Maybe<Scalars['Boolean']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  streetLine1: Scalars['String']['output'];
  streetLine2?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Adjustment = {
  __typename?: 'Adjustment';
  adjustmentSource: Scalars['String']['output'];
  amount: Scalars['Money']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  description: Scalars['String']['output'];
  type: AdjustmentType;
};

export enum AdjustmentType {
  DistributedOrderPromotion = 'DISTRIBUTED_ORDER_PROMOTION',
  Other = 'OTHER',
  Promotion = 'PROMOTION'
}

/** Returned when attempting to set the Customer for an Order when already logged in. */
export type AlreadyLoggedInError = ErrorResult & {
  __typename?: 'AlreadyLoggedInError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type ApplyCouponCodeResult = CouponCodeExpiredError | CouponCodeInvalidError | CouponCodeLimitError | Order;

export type Asset = Node & {
  __typename?: 'Asset';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  fileSize: Scalars['Int']['output'];
  focalPoint?: Maybe<Coordinate>;
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  mimeType: Scalars['String']['output'];
  name: Scalars['String']['output'];
  preview: Scalars['String']['output'];
  source: Scalars['String']['output'];
  tags: Array<Tag>;
  type: AssetType;
  updatedAt: Scalars['DateTime']['output'];
  width: Scalars['Int']['output'];
};

export type AssetList = PaginatedList & {
  __typename?: 'AssetList';
  items: Array<Asset>;
  totalItems: Scalars['Int']['output'];
};

export enum AssetType {
  Binary = 'BINARY',
  Image = 'IMAGE',
  Video = 'VIDEO'
}

export type AuthenticationInput = {
  google?: InputMaybe<GoogleAuthInput>;
  kakao?: InputMaybe<KakaoAuthInput>;
  native?: InputMaybe<NativeAuthInput>;
  naver?: InputMaybe<NaverAuthInput>;
};

export type AuthenticationMethod = Node & {
  __typename?: 'AuthenticationMethod';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  strategy: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AuthenticationResult = CurrentUser | InvalidCredentialsError | NotVerifiedError;

export type BooleanCustomFieldConfig = CustomField & {
  __typename?: 'BooleanCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

/** Operators for filtering on a list of Boolean fields */
export type BooleanListOperators = {
  inList: Scalars['Boolean']['input'];
};

/** Operators for filtering on a Boolean field */
export type BooleanOperators = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Channel = Node & {
  __typename?: 'Channel';
  availableCurrencyCodes: Array<CurrencyCode>;
  availableLanguageCodes?: Maybe<Array<LanguageCode>>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  /** @deprecated Use defaultCurrencyCode instead */
  currencyCode: CurrencyCode;
  customFields?: Maybe<Scalars['JSON']['output']>;
  defaultCurrencyCode: CurrencyCode;
  defaultLanguageCode: LanguageCode;
  defaultShippingZone?: Maybe<Zone>;
  defaultTaxZone?: Maybe<Zone>;
  id: Scalars['ID']['output'];
  /** Not yet used - will be implemented in a future release. */
  outOfStockThreshold?: Maybe<Scalars['Int']['output']>;
  pricesIncludeTax: Scalars['Boolean']['output'];
  seller?: Maybe<Seller>;
  token: Scalars['String']['output'];
  /** Not yet used - will be implemented in a future release. */
  trackInventory?: Maybe<Scalars['Boolean']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type Collection = Node & {
  __typename?: 'Collection';
  assets: Array<Asset>;
  breadcrumbs: Array<CollectionBreadcrumb>;
  children?: Maybe<Array<Collection>>;
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  description: Scalars['String']['output'];
  featuredAsset?: Maybe<Asset>;
  filters: Array<ConfigurableOperation>;
  id: Scalars['ID']['output'];
  languageCode?: Maybe<LanguageCode>;
  name: Scalars['String']['output'];
  parent?: Maybe<Collection>;
  parentId: Scalars['ID']['output'];
  position: Scalars['Int']['output'];
  productVariants: ProductVariantList;
  slug: Scalars['String']['output'];
  translations: Array<CollectionTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};


export type CollectionProductVariantsArgs = {
  options?: InputMaybe<ProductVariantListOptions>;
};

export type CollectionBreadcrumb = {
  __typename?: 'CollectionBreadcrumb';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type CollectionFilterParameter = {
  _and?: InputMaybe<Array<CollectionFilterParameter>>;
  _or?: InputMaybe<Array<CollectionFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  parentId?: InputMaybe<IdOperators>;
  position?: InputMaybe<NumberOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type CollectionList = PaginatedList & {
  __typename?: 'CollectionList';
  items: Array<Collection>;
  totalItems: Scalars['Int']['output'];
};

export type CollectionListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<CollectionFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<CollectionSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
  topLevelOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * Which Collections are present in the products returned
 * by the search, and in what quantity.
 */
export type CollectionResult = {
  __typename?: 'CollectionResult';
  collection: Collection;
  count: Scalars['Int']['output'];
};

export type CollectionSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  parentId?: InputMaybe<SortOrder>;
  position?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CollectionTranslation = {
  __typename?: 'CollectionTranslation';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ConfigArg = {
  __typename?: 'ConfigArg';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ConfigArgDefinition = {
  __typename?: 'ConfigArgDefinition';
  defaultValue?: Maybe<Scalars['JSON']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  required: Scalars['Boolean']['output'];
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type ConfigArgInput = {
  name: Scalars['String']['input'];
  /** A JSON stringified representation of the actual value */
  value: Scalars['String']['input'];
};

export type ConfigurableOperation = {
  __typename?: 'ConfigurableOperation';
  args: Array<ConfigArg>;
  code: Scalars['String']['output'];
};

export type ConfigurableOperationDefinition = {
  __typename?: 'ConfigurableOperationDefinition';
  args: Array<ConfigArgDefinition>;
  code: Scalars['String']['output'];
  description: Scalars['String']['output'];
};

export type ConfigurableOperationInput = {
  arguments: Array<ConfigArgInput>;
  code: Scalars['String']['input'];
};

export type Coordinate = {
  __typename?: 'Coordinate';
  x: Scalars['Float']['output'];
  y: Scalars['Float']['output'];
};

export type Country = Node & Region & {
  __typename?: 'Country';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  parent?: Maybe<Region>;
  parentId?: Maybe<Scalars['ID']['output']>;
  translations: Array<RegionTranslation>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CountryList = PaginatedList & {
  __typename?: 'CountryList';
  items: Array<Country>;
  totalItems: Scalars['Int']['output'];
};

export type Coupon = Node & {
  __typename?: 'Coupon';
  code: Scalars['String']['output'];
  couponTemplate: CouponTemplate;
  couponTemplateId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  customer: Customer;
  customerId: Scalars['ID']['output'];
  expiresAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  state: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  usedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeExpiredError = ErrorResult & {
  __typename?: 'CouponCodeExpiredError';
  couponCode: Scalars['String']['output'];
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeInvalidError = ErrorResult & {
  __typename?: 'CouponCodeInvalidError';
  couponCode: Scalars['String']['output'];
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Returned if the provided coupon code is invalid */
export type CouponCodeLimitError = ErrorResult & {
  __typename?: 'CouponCodeLimitError';
  couponCode: Scalars['String']['output'];
  errorCode: ErrorCode;
  limit: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type CouponTemplate = Node & {
  __typename?: 'CouponTemplate';
  couponType: CouponType;
  createdAt: Scalars['DateTime']['output'];
  expireInDay: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Int']['output'];
};

export enum CouponType {
  Point = 'POINT'
}

export type CreateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  countryCode: Scalars['String']['input'];
  customFields?: InputMaybe<Scalars['JSON']['input']>;
  defaultBillingAddress?: InputMaybe<Scalars['Boolean']['input']>;
  defaultShippingAddress?: InputMaybe<Scalars['Boolean']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  streetLine1: Scalars['String']['input'];
  streetLine2?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCustomerCustomFieldsInput = {
  invitorId?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateCustomerInput = {
  customFields?: InputMaybe<CreateCustomerCustomFieldsInput>;
  emailAddress: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/**
 * @description
 * ISO 4217 currency code
 *
 * @docsCategory common
 */
export enum CurrencyCode {
  /** United Arab Emirates dirham */
  Aed = 'AED',
  /** Afghan afghani */
  Afn = 'AFN',
  /** Albanian lek */
  All = 'ALL',
  /** Armenian dram */
  Amd = 'AMD',
  /** Netherlands Antillean guilder */
  Ang = 'ANG',
  /** Angolan kwanza */
  Aoa = 'AOA',
  /** Argentine peso */
  Ars = 'ARS',
  /** Australian dollar */
  Aud = 'AUD',
  /** Aruban florin */
  Awg = 'AWG',
  /** Azerbaijani manat */
  Azn = 'AZN',
  /** Bosnia and Herzegovina convertible mark */
  Bam = 'BAM',
  /** Barbados dollar */
  Bbd = 'BBD',
  /** Bangladeshi taka */
  Bdt = 'BDT',
  /** Bulgarian lev */
  Bgn = 'BGN',
  /** Bahraini dinar */
  Bhd = 'BHD',
  /** Burundian franc */
  Bif = 'BIF',
  /** Bermudian dollar */
  Bmd = 'BMD',
  /** Brunei dollar */
  Bnd = 'BND',
  /** Boliviano */
  Bob = 'BOB',
  /** Brazilian real */
  Brl = 'BRL',
  /** Bahamian dollar */
  Bsd = 'BSD',
  /** Bhutanese ngultrum */
  Btn = 'BTN',
  /** Botswana pula */
  Bwp = 'BWP',
  /** Belarusian ruble */
  Byn = 'BYN',
  /** Belize dollar */
  Bzd = 'BZD',
  /** Canadian dollar */
  Cad = 'CAD',
  /** Congolese franc */
  Cdf = 'CDF',
  /** Swiss franc */
  Chf = 'CHF',
  /** Chilean peso */
  Clp = 'CLP',
  /** Renminbi (Chinese) yuan */
  Cny = 'CNY',
  /** Colombian peso */
  Cop = 'COP',
  /** Costa Rican colon */
  Crc = 'CRC',
  /** Cuban convertible peso */
  Cuc = 'CUC',
  /** Cuban peso */
  Cup = 'CUP',
  /** Cape Verde escudo */
  Cve = 'CVE',
  /** Czech koruna */
  Czk = 'CZK',
  /** Djiboutian franc */
  Djf = 'DJF',
  /** Danish krone */
  Dkk = 'DKK',
  /** Dominican peso */
  Dop = 'DOP',
  /** Algerian dinar */
  Dzd = 'DZD',
  /** Egyptian pound */
  Egp = 'EGP',
  /** Eritrean nakfa */
  Ern = 'ERN',
  /** Ethiopian birr */
  Etb = 'ETB',
  /** Euro */
  Eur = 'EUR',
  /** Fiji dollar */
  Fjd = 'FJD',
  /** Falkland Islands pound */
  Fkp = 'FKP',
  /** Pound sterling */
  Gbp = 'GBP',
  /** Georgian lari */
  Gel = 'GEL',
  /** Ghanaian cedi */
  Ghs = 'GHS',
  /** Gibraltar pound */
  Gip = 'GIP',
  /** Gambian dalasi */
  Gmd = 'GMD',
  /** Guinean franc */
  Gnf = 'GNF',
  /** Guatemalan quetzal */
  Gtq = 'GTQ',
  /** Guyanese dollar */
  Gyd = 'GYD',
  /** Hong Kong dollar */
  Hkd = 'HKD',
  /** Honduran lempira */
  Hnl = 'HNL',
  /** Croatian kuna */
  Hrk = 'HRK',
  /** Haitian gourde */
  Htg = 'HTG',
  /** Hungarian forint */
  Huf = 'HUF',
  /** Indonesian rupiah */
  Idr = 'IDR',
  /** Israeli new shekel */
  Ils = 'ILS',
  /** Indian rupee */
  Inr = 'INR',
  /** Iraqi dinar */
  Iqd = 'IQD',
  /** Iranian rial */
  Irr = 'IRR',
  /** Icelandic króna */
  Isk = 'ISK',
  /** Jamaican dollar */
  Jmd = 'JMD',
  /** Jordanian dinar */
  Jod = 'JOD',
  /** Japanese yen */
  Jpy = 'JPY',
  /** Kenyan shilling */
  Kes = 'KES',
  /** Kyrgyzstani som */
  Kgs = 'KGS',
  /** Cambodian riel */
  Khr = 'KHR',
  /** Comoro franc */
  Kmf = 'KMF',
  /** North Korean won */
  Kpw = 'KPW',
  /** South Korean won */
  Krw = 'KRW',
  /** Kuwaiti dinar */
  Kwd = 'KWD',
  /** Cayman Islands dollar */
  Kyd = 'KYD',
  /** Kazakhstani tenge */
  Kzt = 'KZT',
  /** Lao kip */
  Lak = 'LAK',
  /** Lebanese pound */
  Lbp = 'LBP',
  /** Sri Lankan rupee */
  Lkr = 'LKR',
  /** Liberian dollar */
  Lrd = 'LRD',
  /** Lesotho loti */
  Lsl = 'LSL',
  /** Libyan dinar */
  Lyd = 'LYD',
  /** Moroccan dirham */
  Mad = 'MAD',
  /** Moldovan leu */
  Mdl = 'MDL',
  /** Malagasy ariary */
  Mga = 'MGA',
  /** Macedonian denar */
  Mkd = 'MKD',
  /** Myanmar kyat */
  Mmk = 'MMK',
  /** Mongolian tögrög */
  Mnt = 'MNT',
  /** Macanese pataca */
  Mop = 'MOP',
  /** Mauritanian ouguiya */
  Mru = 'MRU',
  /** Mauritian rupee */
  Mur = 'MUR',
  /** Maldivian rufiyaa */
  Mvr = 'MVR',
  /** Malawian kwacha */
  Mwk = 'MWK',
  /** Mexican peso */
  Mxn = 'MXN',
  /** Malaysian ringgit */
  Myr = 'MYR',
  /** Mozambican metical */
  Mzn = 'MZN',
  /** Namibian dollar */
  Nad = 'NAD',
  /** Nigerian naira */
  Ngn = 'NGN',
  /** Nicaraguan córdoba */
  Nio = 'NIO',
  /** Norwegian krone */
  Nok = 'NOK',
  /** Nepalese rupee */
  Npr = 'NPR',
  /** New Zealand dollar */
  Nzd = 'NZD',
  /** Omani rial */
  Omr = 'OMR',
  /** Panamanian balboa */
  Pab = 'PAB',
  /** Peruvian sol */
  Pen = 'PEN',
  /** Papua New Guinean kina */
  Pgk = 'PGK',
  /** Philippine peso */
  Php = 'PHP',
  /** Pakistani rupee */
  Pkr = 'PKR',
  /** Polish złoty */
  Pln = 'PLN',
  /** Paraguayan guaraní */
  Pyg = 'PYG',
  /** Qatari riyal */
  Qar = 'QAR',
  /** Romanian leu */
  Ron = 'RON',
  /** Serbian dinar */
  Rsd = 'RSD',
  /** Russian ruble */
  Rub = 'RUB',
  /** Rwandan franc */
  Rwf = 'RWF',
  /** Saudi riyal */
  Sar = 'SAR',
  /** Solomon Islands dollar */
  Sbd = 'SBD',
  /** Seychelles rupee */
  Scr = 'SCR',
  /** Sudanese pound */
  Sdg = 'SDG',
  /** Swedish krona/kronor */
  Sek = 'SEK',
  /** Singapore dollar */
  Sgd = 'SGD',
  /** Saint Helena pound */
  Shp = 'SHP',
  /** Sierra Leonean leone */
  Sll = 'SLL',
  /** Somali shilling */
  Sos = 'SOS',
  /** Surinamese dollar */
  Srd = 'SRD',
  /** South Sudanese pound */
  Ssp = 'SSP',
  /** São Tomé and Príncipe dobra */
  Stn = 'STN',
  /** Salvadoran colón */
  Svc = 'SVC',
  /** Syrian pound */
  Syp = 'SYP',
  /** Swazi lilangeni */
  Szl = 'SZL',
  /** Thai baht */
  Thb = 'THB',
  /** Tajikistani somoni */
  Tjs = 'TJS',
  /** Turkmenistan manat */
  Tmt = 'TMT',
  /** Tunisian dinar */
  Tnd = 'TND',
  /** Tongan paʻanga */
  Top = 'TOP',
  /** Turkish lira */
  Try = 'TRY',
  /** Trinidad and Tobago dollar */
  Ttd = 'TTD',
  /** New Taiwan dollar */
  Twd = 'TWD',
  /** Tanzanian shilling */
  Tzs = 'TZS',
  /** Ukrainian hryvnia */
  Uah = 'UAH',
  /** Ugandan shilling */
  Ugx = 'UGX',
  /** United States dollar */
  Usd = 'USD',
  /** Uruguayan peso */
  Uyu = 'UYU',
  /** Uzbekistan som */
  Uzs = 'UZS',
  /** Venezuelan bolívar soberano */
  Ves = 'VES',
  /** Vietnamese đồng */
  Vnd = 'VND',
  /** Vanuatu vatu */
  Vuv = 'VUV',
  /** Samoan tala */
  Wst = 'WST',
  /** CFA franc BEAC */
  Xaf = 'XAF',
  /** East Caribbean dollar */
  Xcd = 'XCD',
  /** CFA franc BCEAO */
  Xof = 'XOF',
  /** CFP franc (franc Pacifique) */
  Xpf = 'XPF',
  /** Yemeni rial */
  Yer = 'YER',
  /** South African rand */
  Zar = 'ZAR',
  /** Zambian kwacha */
  Zmw = 'ZMW',
  /** Zimbabwean dollar */
  Zwl = 'ZWL'
}

export type CurrentUser = {
  __typename?: 'CurrentUser';
  channels: Array<CurrentUserChannel>;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
};

export type CurrentUserChannel = {
  __typename?: 'CurrentUserChannel';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  permissions: Array<Permission>;
  token: Scalars['String']['output'];
};

export type CustomField = {
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type CustomFieldConfig = BooleanCustomFieldConfig | DateTimeCustomFieldConfig | FloatCustomFieldConfig | IntCustomFieldConfig | LocaleStringCustomFieldConfig | LocaleTextCustomFieldConfig | RelationCustomFieldConfig | StringCustomFieldConfig | TextCustomFieldConfig;

export type Customer = Node & {
  __typename?: 'Customer';
  addresses?: Maybe<Array<Address>>;
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<CustomerCustomFields>;
  emailAddress: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  marketingAgreement?: Maybe<MarketingAgreement>;
  orders: OrderList;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
};


export type CustomerOrdersArgs = {
  options?: InputMaybe<OrderListOptions>;
};

export type CustomerCreateError = ErrorResult & {
  __typename?: 'CustomerCreateError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type CustomerCustomFields = {
  __typename?: 'CustomerCustomFields';
  invitor?: Maybe<Customer>;
  invitorsCode?: Maybe<Scalars['String']['output']>;
};

export type CustomerFilterParameter = {
  _and?: InputMaybe<Array<CustomerFilterParameter>>;
  _or?: InputMaybe<Array<CustomerFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  emailAddress?: InputMaybe<StringOperators>;
  firstName?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  invitorsCode?: InputMaybe<StringOperators>;
  lastName?: InputMaybe<StringOperators>;
  phoneNumber?: InputMaybe<StringOperators>;
  title?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type CustomerGroup = Node & {
  __typename?: 'CustomerGroup';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  customers: CustomerList;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};


export type CustomerGroupCustomersArgs = {
  options?: InputMaybe<CustomerListOptions>;
};

export type CustomerList = PaginatedList & {
  __typename?: 'CustomerList';
  items: Array<Customer>;
  totalItems: Scalars['Int']['output'];
};

export type CustomerListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<CustomerFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<CustomerSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type CustomerSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  emailAddress?: InputMaybe<SortOrder>;
  firstName?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  invitor?: InputMaybe<SortOrder>;
  invitorsCode?: InputMaybe<SortOrder>;
  lastName?: InputMaybe<SortOrder>;
  phoneNumber?: InputMaybe<SortOrder>;
  title?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

/** Operators for filtering on a list of Date fields */
export type DateListOperators = {
  inList: Scalars['DateTime']['input'];
};

/** Operators for filtering on a DateTime field */
export type DateOperators = {
  after?: InputMaybe<Scalars['DateTime']['input']>;
  before?: InputMaybe<Scalars['DateTime']['input']>;
  between?: InputMaybe<DateRange>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DateRange = {
  end: Scalars['DateTime']['input'];
  start: Scalars['DateTime']['input'];
};

/**
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 */
export type DateTimeCustomFieldConfig = CustomField & {
  __typename?: 'DateTimeCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  max?: Maybe<Scalars['String']['output']>;
  min?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  step?: Maybe<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type DeletionResponse = {
  __typename?: 'DeletionResponse';
  message?: Maybe<Scalars['String']['output']>;
  result: DeletionResult;
};

export enum DeletionResult {
  /** The entity was successfully deleted */
  Deleted = 'DELETED',
  /** Deletion did not take place, reason given in message */
  NotDeleted = 'NOT_DELETED'
}

export type Discount = {
  __typename?: 'Discount';
  adjustmentSource: Scalars['String']['output'];
  amount: Scalars['Money']['output'];
  amountWithTax: Scalars['Money']['output'];
  description: Scalars['String']['output'];
  type: AdjustmentType;
};

/** Returned when attempting to create a Customer with an email address already registered to an existing User. */
export type EmailAddressConflictError = ErrorResult & {
  __typename?: 'EmailAddressConflictError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export enum ErrorCode {
  AlreadyLoggedInError = 'ALREADY_LOGGED_IN_ERROR',
  CouponCodeExpiredError = 'COUPON_CODE_EXPIRED_ERROR',
  CouponCodeInvalidError = 'COUPON_CODE_INVALID_ERROR',
  CouponCodeLimitError = 'COUPON_CODE_LIMIT_ERROR',
  CustomerCreateError = 'CUSTOMER_CREATE_ERROR',
  EmailAddressConflictError = 'EMAIL_ADDRESS_CONFLICT_ERROR',
  GuestCheckoutError = 'GUEST_CHECKOUT_ERROR',
  IdentifierChangeTokenExpiredError = 'IDENTIFIER_CHANGE_TOKEN_EXPIRED_ERROR',
  IdentifierChangeTokenInvalidError = 'IDENTIFIER_CHANGE_TOKEN_INVALID_ERROR',
  IneligiblePaymentMethodError = 'INELIGIBLE_PAYMENT_METHOD_ERROR',
  IneligibleShippingMethodError = 'INELIGIBLE_SHIPPING_METHOD_ERROR',
  InsufficientStockError = 'INSUFFICIENT_STOCK_ERROR',
  InvalidCredentialsError = 'INVALID_CREDENTIALS_ERROR',
  MissingPasswordError = 'MISSING_PASSWORD_ERROR',
  NativeAuthStrategyError = 'NATIVE_AUTH_STRATEGY_ERROR',
  NegativeQuantityError = 'NEGATIVE_QUANTITY_ERROR',
  NotVerifiedError = 'NOT_VERIFIED_ERROR',
  NoActiveOrderError = 'NO_ACTIVE_ORDER_ERROR',
  OrderLimitError = 'ORDER_LIMIT_ERROR',
  OrderModificationError = 'ORDER_MODIFICATION_ERROR',
  OrderPaymentStateError = 'ORDER_PAYMENT_STATE_ERROR',
  OrderStateTransitionError = 'ORDER_STATE_TRANSITION_ERROR',
  PasswordAlreadySetError = 'PASSWORD_ALREADY_SET_ERROR',
  PasswordResetTokenExpiredError = 'PASSWORD_RESET_TOKEN_EXPIRED_ERROR',
  PasswordResetTokenInvalidError = 'PASSWORD_RESET_TOKEN_INVALID_ERROR',
  PasswordValidationError = 'PASSWORD_VALIDATION_ERROR',
  PaymentDeclinedError = 'PAYMENT_DECLINED_ERROR',
  PaymentFailedError = 'PAYMENT_FAILED_ERROR',
  RegisterCustomerInviteCodeError = 'REGISTER_CUSTOMER_INVITE_CODE_ERROR',
  UnknownError = 'UNKNOWN_ERROR',
  UseCouponError = 'USE_COUPON_ERROR',
  VerificationTokenExpiredError = 'VERIFICATION_TOKEN_EXPIRED_ERROR',
  VerificationTokenInvalidError = 'VERIFICATION_TOKEN_INVALID_ERROR'
}

export type ErrorResult = {
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type Facet = Node & {
  __typename?: 'Facet';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  translations: Array<FacetTranslation>;
  updatedAt: Scalars['DateTime']['output'];
  /** Returns a paginated, sortable, filterable list of the Facet's values. Added in v2.1.0. */
  valueList: FacetValueList;
  values: Array<FacetValue>;
};


export type FacetValueListArgs = {
  options?: InputMaybe<FacetValueListOptions>;
};

export type FacetFilterParameter = {
  _and?: InputMaybe<Array<FacetFilterParameter>>;
  _or?: InputMaybe<Array<FacetFilterParameter>>;
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type FacetList = PaginatedList & {
  __typename?: 'FacetList';
  items: Array<Facet>;
  totalItems: Scalars['Int']['output'];
};

export type FacetListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<FacetFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<FacetSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type FacetSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FacetTranslation = {
  __typename?: 'FacetTranslation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FacetValue = Node & {
  __typename?: 'FacetValue';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  facet: Facet;
  facetId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  translations: Array<FacetValueTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

/**
 * Used to construct boolean expressions for filtering search results
 * by FacetValue ID. Examples:
 *
 * * ID=1 OR ID=2: `{ facetValueFilters: [{ or: [1,2] }] }`
 * * ID=1 AND ID=2: `{ facetValueFilters: [{ and: 1 }, { and: 2 }] }`
 * * ID=1 AND (ID=2 OR ID=3): `{ facetValueFilters: [{ and: 1 }, { or: [2,3] }] }`
 */
export type FacetValueFilterInput = {
  and?: InputMaybe<Scalars['ID']['input']>;
  or?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type FacetValueFilterParameter = {
  _and?: InputMaybe<Array<FacetValueFilterParameter>>;
  _or?: InputMaybe<Array<FacetValueFilterParameter>>;
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  facetId?: InputMaybe<IdOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type FacetValueList = PaginatedList & {
  __typename?: 'FacetValueList';
  items: Array<FacetValue>;
  totalItems: Scalars['Int']['output'];
};

export type FacetValueListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<FacetValueFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<FacetValueSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Which FacetValues are present in the products returned
 * by the search, and in what quantity.
 */
export type FacetValueResult = {
  __typename?: 'FacetValueResult';
  count: Scalars['Int']['output'];
  facetValue: FacetValue;
};

export type FacetValueSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  facetId?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type FacetValueTranslation = {
  __typename?: 'FacetValueTranslation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type FloatCustomFieldConfig = CustomField & {
  __typename?: 'FloatCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  step?: Maybe<Scalars['Float']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type Fulfillment = Node & {
  __typename?: 'Fulfillment';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  lines: Array<FulfillmentLine>;
  method: Scalars['String']['output'];
  state: Scalars['String']['output'];
  /** @deprecated Use the `lines` field instead */
  summary: Array<FulfillmentLine>;
  trackingCode?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type FulfillmentLine = {
  __typename?: 'FulfillmentLine';
  fulfillment: Fulfillment;
  fulfillmentId: Scalars['ID']['output'];
  orderLine: OrderLine;
  orderLineId: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
};

export enum GlobalFlag {
  False = 'FALSE',
  Inherit = 'INHERIT',
  True = 'TRUE'
}

export type GoogleAuthInput = {
  token: Scalars['String']['input'];
};

/** Returned when attempting to set the Customer on a guest checkout when the configured GuestCheckoutStrategy does not allow it. */
export type GuestCheckoutError = ErrorResult & {
  __typename?: 'GuestCheckoutError';
  errorCode: ErrorCode;
  errorDetail: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type HistoryEntry = Node & {
  __typename?: 'HistoryEntry';
  createdAt: Scalars['DateTime']['output'];
  data: Scalars['JSON']['output'];
  id: Scalars['ID']['output'];
  type: HistoryEntryType;
  updatedAt: Scalars['DateTime']['output'];
};

export type HistoryEntryFilterParameter = {
  _and?: InputMaybe<Array<HistoryEntryFilterParameter>>;
  _or?: InputMaybe<Array<HistoryEntryFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  id?: InputMaybe<IdOperators>;
  type?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type HistoryEntryList = PaginatedList & {
  __typename?: 'HistoryEntryList';
  items: Array<HistoryEntry>;
  totalItems: Scalars['Int']['output'];
};

export type HistoryEntryListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<HistoryEntryFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<HistoryEntrySortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type HistoryEntrySortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum HistoryEntryType {
  CustomerAddedToGroup = 'CUSTOMER_ADDED_TO_GROUP',
  CustomerAddressCreated = 'CUSTOMER_ADDRESS_CREATED',
  CustomerAddressDeleted = 'CUSTOMER_ADDRESS_DELETED',
  CustomerAddressUpdated = 'CUSTOMER_ADDRESS_UPDATED',
  CustomerDetailUpdated = 'CUSTOMER_DETAIL_UPDATED',
  CustomerEmailUpdateRequested = 'CUSTOMER_EMAIL_UPDATE_REQUESTED',
  CustomerEmailUpdateVerified = 'CUSTOMER_EMAIL_UPDATE_VERIFIED',
  CustomerNote = 'CUSTOMER_NOTE',
  CustomerPasswordResetRequested = 'CUSTOMER_PASSWORD_RESET_REQUESTED',
  CustomerPasswordResetVerified = 'CUSTOMER_PASSWORD_RESET_VERIFIED',
  CustomerPasswordUpdated = 'CUSTOMER_PASSWORD_UPDATED',
  CustomerRegistered = 'CUSTOMER_REGISTERED',
  CustomerRemovedFromGroup = 'CUSTOMER_REMOVED_FROM_GROUP',
  CustomerVerified = 'CUSTOMER_VERIFIED',
  OrderCancellation = 'ORDER_CANCELLATION',
  OrderCouponApplied = 'ORDER_COUPON_APPLIED',
  OrderCouponRemoved = 'ORDER_COUPON_REMOVED',
  OrderFulfillment = 'ORDER_FULFILLMENT',
  OrderFulfillmentTransition = 'ORDER_FULFILLMENT_TRANSITION',
  OrderModified = 'ORDER_MODIFIED',
  OrderNote = 'ORDER_NOTE',
  OrderPaymentTransition = 'ORDER_PAYMENT_TRANSITION',
  OrderRefundTransition = 'ORDER_REFUND_TRANSITION',
  OrderStateTransition = 'ORDER_STATE_TRANSITION'
}

/** Operators for filtering on a list of ID fields */
export type IdListOperators = {
  inList: Scalars['ID']['input'];
};

/** Operators for filtering on an ID field */
export type IdOperators = {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notEq?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

/**
 * Returned if the token used to change a Customer's email address is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type IdentifierChangeTokenExpiredError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/**
 * Returned if the token used to change a Customer's email address is either
 * invalid or does not match any expected tokens.
 */
export type IdentifierChangeTokenInvalidError = ErrorResult & {
  __typename?: 'IdentifierChangeTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Returned when attempting to add a Payment using a PaymentMethod for which the Order is not eligible. */
export type IneligiblePaymentMethodError = ErrorResult & {
  __typename?: 'IneligiblePaymentMethodError';
  eligibilityCheckerMessage?: Maybe<Scalars['String']['output']>;
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Returned when attempting to set a ShippingMethod for which the Order is not eligible */
export type IneligibleShippingMethodError = ErrorResult & {
  __typename?: 'IneligibleShippingMethodError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Returned when attempting to add more items to the Order than are available */
export type InsufficientStockError = ErrorResult & {
  __typename?: 'InsufficientStockError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
  order: Order;
  quantityAvailable: Scalars['Int']['output'];
};

export type IntCustomFieldConfig = CustomField & {
  __typename?: 'IntCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  max?: Maybe<Scalars['Int']['output']>;
  min?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  step?: Maybe<Scalars['Int']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

/** Returned if the user authentication credentials are not valid */
export type InvalidCredentialsError = ErrorResult & {
  __typename?: 'InvalidCredentialsError';
  authenticationError: Scalars['String']['output'];
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type KakaoAuthInput = {
  code: Scalars['String']['input'];
};

/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 *
 * @docsCategory common
 */
export enum LanguageCode {
  /** Afrikaans */
  Af = 'af',
  /** Akan */
  Ak = 'ak',
  /** Amharic */
  Am = 'am',
  /** Arabic */
  Ar = 'ar',
  /** Assamese */
  As = 'as',
  /** Azerbaijani */
  Az = 'az',
  /** Belarusian */
  Be = 'be',
  /** Bulgarian */
  Bg = 'bg',
  /** Bambara */
  Bm = 'bm',
  /** Bangla */
  Bn = 'bn',
  /** Tibetan */
  Bo = 'bo',
  /** Breton */
  Br = 'br',
  /** Bosnian */
  Bs = 'bs',
  /** Catalan */
  Ca = 'ca',
  /** Chechen */
  Ce = 'ce',
  /** Corsican */
  Co = 'co',
  /** Czech */
  Cs = 'cs',
  /** Church Slavic */
  Cu = 'cu',
  /** Welsh */
  Cy = 'cy',
  /** Danish */
  Da = 'da',
  /** German */
  De = 'de',
  /** Austrian German */
  DeAt = 'de_AT',
  /** Swiss High German */
  DeCh = 'de_CH',
  /** Dzongkha */
  Dz = 'dz',
  /** Ewe */
  Ee = 'ee',
  /** Greek */
  El = 'el',
  /** English */
  En = 'en',
  /** Australian English */
  EnAu = 'en_AU',
  /** Canadian English */
  EnCa = 'en_CA',
  /** British English */
  EnGb = 'en_GB',
  /** American English */
  EnUs = 'en_US',
  /** Esperanto */
  Eo = 'eo',
  /** Spanish */
  Es = 'es',
  /** European Spanish */
  EsEs = 'es_ES',
  /** Mexican Spanish */
  EsMx = 'es_MX',
  /** Estonian */
  Et = 'et',
  /** Basque */
  Eu = 'eu',
  /** Persian */
  Fa = 'fa',
  /** Dari */
  FaAf = 'fa_AF',
  /** Fulah */
  Ff = 'ff',
  /** Finnish */
  Fi = 'fi',
  /** Faroese */
  Fo = 'fo',
  /** French */
  Fr = 'fr',
  /** Canadian French */
  FrCa = 'fr_CA',
  /** Swiss French */
  FrCh = 'fr_CH',
  /** Western Frisian */
  Fy = 'fy',
  /** Irish */
  Ga = 'ga',
  /** Scottish Gaelic */
  Gd = 'gd',
  /** Galician */
  Gl = 'gl',
  /** Gujarati */
  Gu = 'gu',
  /** Manx */
  Gv = 'gv',
  /** Hausa */
  Ha = 'ha',
  /** Hebrew */
  He = 'he',
  /** Hindi */
  Hi = 'hi',
  /** Croatian */
  Hr = 'hr',
  /** Haitian Creole */
  Ht = 'ht',
  /** Hungarian */
  Hu = 'hu',
  /** Armenian */
  Hy = 'hy',
  /** Interlingua */
  Ia = 'ia',
  /** Indonesian */
  Id = 'id',
  /** Igbo */
  Ig = 'ig',
  /** Sichuan Yi */
  Ii = 'ii',
  /** Icelandic */
  Is = 'is',
  /** Italian */
  It = 'it',
  /** Japanese */
  Ja = 'ja',
  /** Javanese */
  Jv = 'jv',
  /** Georgian */
  Ka = 'ka',
  /** Kikuyu */
  Ki = 'ki',
  /** Kazakh */
  Kk = 'kk',
  /** Kalaallisut */
  Kl = 'kl',
  /** Khmer */
  Km = 'km',
  /** Kannada */
  Kn = 'kn',
  /** Korean */
  Ko = 'ko',
  /** Kashmiri */
  Ks = 'ks',
  /** Kurdish */
  Ku = 'ku',
  /** Cornish */
  Kw = 'kw',
  /** Kyrgyz */
  Ky = 'ky',
  /** Latin */
  La = 'la',
  /** Luxembourgish */
  Lb = 'lb',
  /** Ganda */
  Lg = 'lg',
  /** Lingala */
  Ln = 'ln',
  /** Lao */
  Lo = 'lo',
  /** Lithuanian */
  Lt = 'lt',
  /** Luba-Katanga */
  Lu = 'lu',
  /** Latvian */
  Lv = 'lv',
  /** Malagasy */
  Mg = 'mg',
  /** Maori */
  Mi = 'mi',
  /** Macedonian */
  Mk = 'mk',
  /** Malayalam */
  Ml = 'ml',
  /** Mongolian */
  Mn = 'mn',
  /** Marathi */
  Mr = 'mr',
  /** Malay */
  Ms = 'ms',
  /** Maltese */
  Mt = 'mt',
  /** Burmese */
  My = 'my',
  /** Norwegian Bokmål */
  Nb = 'nb',
  /** North Ndebele */
  Nd = 'nd',
  /** Nepali */
  Ne = 'ne',
  /** Dutch */
  Nl = 'nl',
  /** Flemish */
  NlBe = 'nl_BE',
  /** Norwegian Nynorsk */
  Nn = 'nn',
  /** Nyanja */
  Ny = 'ny',
  /** Oromo */
  Om = 'om',
  /** Odia */
  Or = 'or',
  /** Ossetic */
  Os = 'os',
  /** Punjabi */
  Pa = 'pa',
  /** Polish */
  Pl = 'pl',
  /** Pashto */
  Ps = 'ps',
  /** Portuguese */
  Pt = 'pt',
  /** Brazilian Portuguese */
  PtBr = 'pt_BR',
  /** European Portuguese */
  PtPt = 'pt_PT',
  /** Quechua */
  Qu = 'qu',
  /** Romansh */
  Rm = 'rm',
  /** Rundi */
  Rn = 'rn',
  /** Romanian */
  Ro = 'ro',
  /** Moldavian */
  RoMd = 'ro_MD',
  /** Russian */
  Ru = 'ru',
  /** Kinyarwanda */
  Rw = 'rw',
  /** Sanskrit */
  Sa = 'sa',
  /** Sindhi */
  Sd = 'sd',
  /** Northern Sami */
  Se = 'se',
  /** Sango */
  Sg = 'sg',
  /** Sinhala */
  Si = 'si',
  /** Slovak */
  Sk = 'sk',
  /** Slovenian */
  Sl = 'sl',
  /** Samoan */
  Sm = 'sm',
  /** Shona */
  Sn = 'sn',
  /** Somali */
  So = 'so',
  /** Albanian */
  Sq = 'sq',
  /** Serbian */
  Sr = 'sr',
  /** Southern Sotho */
  St = 'st',
  /** Sundanese */
  Su = 'su',
  /** Swedish */
  Sv = 'sv',
  /** Swahili */
  Sw = 'sw',
  /** Congo Swahili */
  SwCd = 'sw_CD',
  /** Tamil */
  Ta = 'ta',
  /** Telugu */
  Te = 'te',
  /** Tajik */
  Tg = 'tg',
  /** Thai */
  Th = 'th',
  /** Tigrinya */
  Ti = 'ti',
  /** Turkmen */
  Tk = 'tk',
  /** Tongan */
  To = 'to',
  /** Turkish */
  Tr = 'tr',
  /** Tatar */
  Tt = 'tt',
  /** Uyghur */
  Ug = 'ug',
  /** Ukrainian */
  Uk = 'uk',
  /** Urdu */
  Ur = 'ur',
  /** Uzbek */
  Uz = 'uz',
  /** Vietnamese */
  Vi = 'vi',
  /** Volapük */
  Vo = 'vo',
  /** Wolof */
  Wo = 'wo',
  /** Xhosa */
  Xh = 'xh',
  /** Yiddish */
  Yi = 'yi',
  /** Yoruba */
  Yo = 'yo',
  /** Chinese */
  Zh = 'zh',
  /** Simplified Chinese */
  ZhHans = 'zh_Hans',
  /** Traditional Chinese */
  ZhHant = 'zh_Hant',
  /** Zulu */
  Zu = 'zu'
}

export type LocaleStringCustomFieldConfig = CustomField & {
  __typename?: 'LocaleStringCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  length?: Maybe<Scalars['Int']['output']>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  pattern?: Maybe<Scalars['String']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type LocaleTextCustomFieldConfig = CustomField & {
  __typename?: 'LocaleTextCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type LocalizedString = {
  __typename?: 'LocalizedString';
  languageCode: LanguageCode;
  value: Scalars['String']['output'];
};

export enum LogicalOperator {
  And = 'AND',
  Or = 'OR'
}

export type MarketingAgreement = Node & {
  __typename?: 'MarketingAgreement';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  pushConsent: Scalars['Boolean']['output'];
  pushConsentUpdatedAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['ID']['output'];
};

export type MeowtimesRegisterCustomerAccountResult = CustomerCreateError | Success;

export type MeowtimesRegisterCustomerInput = {
  authNumber: Scalars['String']['input'];
  emailAddress: Scalars['String']['input'];
  invitorsCode?: InputMaybe<Scalars['String']['input']>;
  marketingAgreement?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber: Scalars['String']['input'];
};

/** Returned when attempting to register or verify a customer account without a password, when one is required. */
export type MissingPasswordError = ErrorResult & {
  __typename?: 'MissingPasswordError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Adds an item to the order. If custom fields are defined on the OrderLine entity, a third argument 'customFields' will be available. */
  addItemToOrder: UpdateOrderItemsResult;
  addItemsToOrder: Order;
  /** Add a Payment to the Order */
  addPaymentToOrder: AddPaymentToOrderResult;
  /** Adjusts an OrderLine. If custom fields are defined on the OrderLine entity, a third argument 'customFields' of type `OrderLineCustomFieldsInput` will be available. */
  adjustOrderLine: UpdateOrderItemsResult;
  /** Applies the given coupon code to the active Order */
  applyCouponCode: ApplyCouponCodeResult;
  /** Authenticates the user using a named authentication strategy */
  authenticate: AuthenticationResult;
  checkPhoneAuthNumber: Success;
  /** Create a new Customer Address */
  createCustomerAddress: Address;
  /** Delete an existing Address */
  deleteCustomerAddress: Success;
  generatePhoneAuthNumber: Success;
  /** Authenticates the user using the native authentication strategy. This mutation is an alias for `authenticate({ native: { ... }})` */
  login: NativeAuthenticationResult;
  /** End the current authenticated session */
  logout: Success;
  meowtimesRegisterCustomerAccount: MeowtimesRegisterCustomerAccountResult;
  /** Regenerate and send a verification token for a new Customer registration. Only applicable if `authOptions.requireVerification` is set to true. */
  refreshCustomerVerification: RefreshCustomerVerificationResult;
  /**
   * Register a Customer account with the given credentials. There are three possible registration flows:
   *
   * _If `authOptions.requireVerification` is set to `true`:_
   *
   * 1. **The Customer is registered _with_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _without_ a password. The Customer is then
   *    verified and authenticated in one step.
   * 2. **The Customer is registered _without_ a password**. A verificationToken will be created (and typically emailed to the Customer). That
   *    verificationToken would then be passed to the `verifyCustomerAccount` mutation _with_ the chosen password of the Customer. The Customer is then
   *    verified and authenticated in one step.
   *
   * _If `authOptions.requireVerification` is set to `false`:_
   *
   * 3. The Customer _must_ be registered _with_ a password. No further action is needed - the Customer is able to authenticate immediately.
   */
  registerCustomerAccount: RegisterCustomerAccountResult;
  registerInviteCode: RegisterCustomerInviteCodeResult;
  /** Remove all OrderLine from the Order */
  removeAllOrderLines: RemoveOrderItemsResult;
  /** Removes the given coupon code from the active Order */
  removeCouponCode?: Maybe<Order>;
  /** Remove an OrderLine from the Order */
  removeOrderLine: RemoveOrderItemsResult;
  removeOrderLines: Order;
  /** Requests a password reset email to be sent */
  requestPasswordReset?: Maybe<RequestPasswordResetResult>;
  /**
   * Request to update the emailAddress of the active Customer. If `authOptions.requireVerification` is enabled
   * (as is the default), then the `identifierChangeToken` will be assigned to the current User and
   * a IdentifierChangeRequestEvent will be raised. This can then be used e.g. by the EmailPlugin to email
   * that verification token to the Customer, which is then used to verify the change of email address.
   */
  requestUpdateCustomerEmailAddress: RequestUpdateCustomerEmailAddressResult;
  /** Resets a Customer's password based on the provided token */
  resetPassword: ResetPasswordResult;
  /** Set the Customer for the Order. Required only if the Customer is not currently logged in */
  setCustomerForOrder: SetCustomerForOrderResult;
  setLikeProduct: Success;
  /** Sets the billing address for this order */
  setOrderBillingAddress: ActiveOrderResult;
  /** Allows any custom fields to be set for the active order */
  setOrderCustomFields: ActiveOrderResult;
  /** Sets the shipping address for this order */
  setOrderShippingAddress: ActiveOrderResult;
  /**
   * Sets the shipping method by id, which can be obtained with the `eligibleShippingMethods` query.
   * An Order can have multiple shipping methods, in which case you can pass an array of ids. In this case,
   * you should configure a custom ShippingLineAssignmentStrategy in order to know which OrderLines each
   * shipping method will apply to.
   */
  setOrderShippingMethod: SetOrderShippingMethodResult;
  /** Transitions an Order to a new state. Valid next states can be found by querying `nextOrderStates` */
  transitionOrderToState?: Maybe<TransitionOrderToStateResult>;
  /** Update an existing Customer */
  updateCustomer: Customer;
  /** Update an existing Address */
  updateCustomerAddress: Address;
  /**
   * Confirm the update of the emailAddress with the provided token, which has been generated by the
   * `requestUpdateCustomerEmailAddress` mutation.
   */
  updateCustomerEmailAddress: UpdateCustomerEmailAddressResult;
  /** Update the password of the active Customer */
  updateCustomerPassword: UpdateCustomerPasswordResult;
  useCoupon: UseCouponResult;
  /**
   * Verify a Customer email address with the token sent to that address. Only applicable if `authOptions.requireVerification` is set to true.
   *
   * If the Customer was not registered with a password in the `registerCustomerAccount` mutation, the password _must_ be
   * provided here.
   */
  verifyCustomerAccount: VerifyCustomerAccountResult;
};


export type MutationAddItemToOrderArgs = {
  productVariantId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationAddItemsToOrderArgs = {
  input: AddItemsToOrderInput;
};


export type MutationAddPaymentToOrderArgs = {
  input: PaymentInput;
};


export type MutationAdjustOrderLineArgs = {
  orderLineId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationApplyCouponCodeArgs = {
  couponCode: Scalars['String']['input'];
};


export type MutationAuthenticateArgs = {
  input: AuthenticationInput;
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCheckPhoneAuthNumberArgs = {
  auth_number: Scalars['String']['input'];
  phone_number: Scalars['String']['input'];
};


export type MutationCreateCustomerAddressArgs = {
  input: CreateAddressInput;
};


export type MutationDeleteCustomerAddressArgs = {
  id: Scalars['ID']['input'];
};


export type MutationGeneratePhoneAuthNumberArgs = {
  phone_number: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  rememberMe?: InputMaybe<Scalars['Boolean']['input']>;
  username: Scalars['String']['input'];
};


export type MutationMeowtimesRegisterCustomerAccountArgs = {
  input: MeowtimesRegisterCustomerInput;
};


export type MutationRefreshCustomerVerificationArgs = {
  emailAddress: Scalars['String']['input'];
};


export type MutationRegisterCustomerAccountArgs = {
  input: RegisterCustomerInput;
};


export type MutationRegisterInviteCodeArgs = {
  invitorsCode: Scalars['String']['input'];
};


export type MutationRemoveCouponCodeArgs = {
  couponCode: Scalars['String']['input'];
};


export type MutationRemoveOrderLineArgs = {
  orderLineId: Scalars['ID']['input'];
};


export type MutationRemoveOrderLinesArgs = {
  orderLineIds: Array<Scalars['ID']['input']>;
};


export type MutationRequestPasswordResetArgs = {
  emailAddress: Scalars['String']['input'];
};


export type MutationRequestUpdateCustomerEmailAddressArgs = {
  newEmailAddress: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationSetCustomerForOrderArgs = {
  input: CreateCustomerInput;
};


export type MutationSetLikeProductArgs = {
  like: Scalars['Boolean']['input'];
  productId: Scalars['ID']['input'];
};


export type MutationSetOrderBillingAddressArgs = {
  input: CreateAddressInput;
};


export type MutationSetOrderCustomFieldsArgs = {
  input: UpdateOrderInput;
};


export type MutationSetOrderShippingAddressArgs = {
  input: CreateAddressInput;
};


export type MutationSetOrderShippingMethodArgs = {
  shippingMethodId: Array<Scalars['ID']['input']>;
};


export type MutationTransitionOrderToStateArgs = {
  state: Scalars['String']['input'];
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateCustomerAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationUpdateCustomerEmailAddressArgs = {
  token: Scalars['String']['input'];
};


export type MutationUpdateCustomerPasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationUseCouponArgs = {
  code: Scalars['String']['input'];
};


export type MutationVerifyCustomerAccountArgs = {
  password?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export type NativeAuthInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

/** Returned when attempting an operation that relies on the NativeAuthStrategy, if that strategy is not configured. */
export type NativeAuthStrategyError = ErrorResult & {
  __typename?: 'NativeAuthStrategyError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type NativeAuthenticationResult = CurrentUser | InvalidCredentialsError | NativeAuthStrategyError | NotVerifiedError;

export type NaverAuthInput = {
  token: Scalars['String']['input'];
};

/** Returned when attempting to set a negative OrderLine quantity. */
export type NegativeQuantityError = ErrorResult & {
  __typename?: 'NegativeQuantityError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/**
 * Returned when invoking a mutation which depends on there being an active Order on the
 * current session.
 */
export type NoActiveOrderError = ErrorResult & {
  __typename?: 'NoActiveOrderError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type Node = {
  id: Scalars['ID']['output'];
};

/**
 * Returned if `authOptions.requireVerification` is set to `true` (which is the default)
 * and an unverified user attempts to authenticate.
 */
export type NotVerifiedError = ErrorResult & {
  __typename?: 'NotVerifiedError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Operators for filtering on a list of Number fields */
export type NumberListOperators = {
  inList: Scalars['Float']['input'];
};

/** Operators for filtering on a Int or Float field */
export type NumberOperators = {
  between?: InputMaybe<NumberRange>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
};

export type NumberRange = {
  end: Scalars['Float']['input'];
  start: Scalars['Float']['input'];
};

export type Order = Node & {
  __typename?: 'Order';
  /** An order is active as long as the payment process has not been completed */
  active: Scalars['Boolean']['output'];
  billingAddress?: Maybe<OrderAddress>;
  /** A unique code for the Order */
  code: Scalars['String']['output'];
  /** An array of all coupon codes applied to the Order */
  couponCodes: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currencyCode: CurrencyCode;
  customFields?: Maybe<Scalars['JSON']['output']>;
  customer?: Maybe<Customer>;
  discounts: Array<Discount>;
  fulfillments?: Maybe<Array<Fulfillment>>;
  history: HistoryEntryList;
  id: Scalars['ID']['output'];
  lines: Array<OrderLine>;
  /**
   * The date & time that the Order was placed, i.e. the Customer
   * completed the checkout and the Order is no longer "active"
   */
  orderPlacedAt?: Maybe<Scalars['DateTime']['output']>;
  payments?: Maybe<Array<Payment>>;
  /** Promotions applied to the order. Only gets populated after the payment process has completed. */
  promotions: Array<Promotion>;
  shipping: Scalars['Money']['output'];
  shippingAddress?: Maybe<OrderAddress>;
  shippingLines: Array<ShippingLine>;
  shippingWithTax: Scalars['Money']['output'];
  state: Scalars['String']['output'];
  /**
   * The subTotal is the total of all OrderLines in the Order. This figure also includes any Order-level
   * discounts which have been prorated (proportionally distributed) amongst the items of each OrderLine.
   * To get a total of all OrderLines which does not account for prorated discounts, use the
   * sum of `OrderLine.discountedLinePrice` values.
   */
  subTotal: Scalars['Money']['output'];
  /** Same as subTotal, but inclusive of tax */
  subTotalWithTax: Scalars['Money']['output'];
  /**
   * Surcharges are arbitrary modifications to the Order total which are neither
   * ProductVariants nor discounts resulting from applied Promotions. For example,
   * one-off discounts based on customer interaction, or surcharges based on payment
   * methods.
   */
  surcharges: Array<Surcharge>;
  /** A summary of the taxes being applied to this Order */
  taxSummary: Array<OrderTaxSummary>;
  /** Equal to subTotal plus shipping */
  total: Scalars['Money']['output'];
  totalQuantity: Scalars['Int']['output'];
  /** The final payable amount. Equal to subTotalWithTax plus shippingWithTax */
  totalWithTax: Scalars['Money']['output'];
  type: OrderType;
  updatedAt: Scalars['DateTime']['output'];
};


export type OrderHistoryArgs = {
  options?: InputMaybe<HistoryEntryListOptions>;
};

export type OrderAddress = {
  __typename?: 'OrderAddress';
  city?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  customFields?: Maybe<Scalars['JSON']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
  streetLine1?: Maybe<Scalars['String']['output']>;
  streetLine2?: Maybe<Scalars['String']['output']>;
};

export type OrderFilterParameter = {
  _and?: InputMaybe<Array<OrderFilterParameter>>;
  _or?: InputMaybe<Array<OrderFilterParameter>>;
  active?: InputMaybe<BooleanOperators>;
  code?: InputMaybe<StringOperators>;
  createdAt?: InputMaybe<DateOperators>;
  currencyCode?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  orderPlacedAt?: InputMaybe<DateOperators>;
  shipping?: InputMaybe<NumberOperators>;
  shippingWithTax?: InputMaybe<NumberOperators>;
  state?: InputMaybe<StringOperators>;
  subTotal?: InputMaybe<NumberOperators>;
  subTotalWithTax?: InputMaybe<NumberOperators>;
  total?: InputMaybe<NumberOperators>;
  totalQuantity?: InputMaybe<NumberOperators>;
  totalWithTax?: InputMaybe<NumberOperators>;
  type?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

/** Returned when the maximum order size limit has been reached. */
export type OrderLimitError = ErrorResult & {
  __typename?: 'OrderLimitError';
  errorCode: ErrorCode;
  maxItems: Scalars['Int']['output'];
  message: Scalars['String']['output'];
};

export type OrderLine = Node & {
  __typename?: 'OrderLine';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  /** The price of the line including discounts, excluding tax */
  discountedLinePrice: Scalars['Money']['output'];
  /** The price of the line including discounts and tax */
  discountedLinePriceWithTax: Scalars['Money']['output'];
  /**
   * The price of a single unit including discounts, excluding tax.
   *
   * If Order-level discounts have been applied, this will not be the
   * actual taxable unit price (see `proratedUnitPrice`), but is generally the
   * correct price to display to customers to avoid confusion
   * about the internal handling of distributed Order-level discounts.
   */
  discountedUnitPrice: Scalars['Money']['output'];
  /** The price of a single unit including discounts and tax */
  discountedUnitPriceWithTax: Scalars['Money']['output'];
  discounts: Array<Discount>;
  featuredAsset?: Maybe<Asset>;
  fulfillmentLines?: Maybe<Array<FulfillmentLine>>;
  id: Scalars['ID']['output'];
  /** The total price of the line excluding tax and discounts. */
  linePrice: Scalars['Money']['output'];
  /** The total price of the line including tax but excluding discounts. */
  linePriceWithTax: Scalars['Money']['output'];
  /** The total tax on this line */
  lineTax: Scalars['Money']['output'];
  order: Order;
  /** The quantity at the time the Order was placed */
  orderPlacedQuantity: Scalars['Int']['output'];
  productVariant: ProductVariant;
  /**
   * The actual line price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderLine, and is used in tax
   * and refund calculations.
   */
  proratedLinePrice: Scalars['Money']['output'];
  /** The proratedLinePrice including tax */
  proratedLinePriceWithTax: Scalars['Money']['output'];
  /**
   * The actual unit price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
   * and refund calculations.
   */
  proratedUnitPrice: Scalars['Money']['output'];
  /** The proratedUnitPrice including tax */
  proratedUnitPriceWithTax: Scalars['Money']['output'];
  /** The quantity of items purchased */
  quantity: Scalars['Int']['output'];
  taxLines: Array<TaxLine>;
  taxRate: Scalars['Float']['output'];
  /** The price of a single unit, excluding tax and discounts */
  unitPrice: Scalars['Money']['output'];
  /** Non-zero if the unitPrice has changed since it was initially added to Order */
  unitPriceChangeSinceAdded: Scalars['Money']['output'];
  /** The price of a single unit, including tax but excluding discounts */
  unitPriceWithTax: Scalars['Money']['output'];
  /** Non-zero if the unitPriceWithTax has changed since it was initially added to Order */
  unitPriceWithTaxChangeSinceAdded: Scalars['Money']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderList = PaginatedList & {
  __typename?: 'OrderList';
  items: Array<Order>;
  totalItems: Scalars['Int']['output'];
};

export type OrderListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<OrderFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<OrderSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

/** Returned when attempting to modify the contents of an Order that is not in the `AddingItems` state. */
export type OrderModificationError = ErrorResult & {
  __typename?: 'OrderModificationError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Returned when attempting to add a Payment to an Order that is not in the `ArrangingPayment` state. */
export type OrderPaymentStateError = ErrorResult & {
  __typename?: 'OrderPaymentStateError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type OrderSortParameter = {
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  orderPlacedAt?: InputMaybe<SortOrder>;
  shipping?: InputMaybe<SortOrder>;
  shippingWithTax?: InputMaybe<SortOrder>;
  state?: InputMaybe<SortOrder>;
  subTotal?: InputMaybe<SortOrder>;
  subTotalWithTax?: InputMaybe<SortOrder>;
  total?: InputMaybe<SortOrder>;
  totalQuantity?: InputMaybe<SortOrder>;
  totalWithTax?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

/** Returned if there is an error in transitioning the Order state */
export type OrderStateTransitionError = ErrorResult & {
  __typename?: 'OrderStateTransitionError';
  errorCode: ErrorCode;
  fromState: Scalars['String']['output'];
  message: Scalars['String']['output'];
  toState: Scalars['String']['output'];
  transitionError: Scalars['String']['output'];
};

/**
 * A summary of the taxes being applied to this order, grouped
 * by taxRate.
 */
export type OrderTaxSummary = {
  __typename?: 'OrderTaxSummary';
  /** A description of this tax */
  description: Scalars['String']['output'];
  /** The total net price of OrderLines to which this taxRate applies */
  taxBase: Scalars['Money']['output'];
  /** The taxRate as a percentage */
  taxRate: Scalars['Float']['output'];
  /** The total tax being applied to the Order at this taxRate */
  taxTotal: Scalars['Money']['output'];
};

export enum OrderType {
  Aggregate = 'Aggregate',
  Regular = 'Regular',
  Seller = 'Seller'
}

export type PaginatedList = {
  items: Array<Node>;
  totalItems: Scalars['Int']['output'];
};

/** Returned when attempting to verify a customer account with a password, when a password has already been set. */
export type PasswordAlreadySetError = ErrorResult & {
  __typename?: 'PasswordAlreadySetError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/**
 * Returned if the token used to reset a Customer's password is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type PasswordResetTokenExpiredError = ErrorResult & {
  __typename?: 'PasswordResetTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/**
 * Returned if the token used to reset a Customer's password is either
 * invalid or does not match any expected tokens.
 */
export type PasswordResetTokenInvalidError = ErrorResult & {
  __typename?: 'PasswordResetTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/** Returned when attempting to register or verify a customer account where the given password fails password validation. */
export type PasswordValidationError = ErrorResult & {
  __typename?: 'PasswordValidationError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
  validationErrorMessage: Scalars['String']['output'];
};

export type Payment = Node & {
  __typename?: 'Payment';
  amount: Scalars['Money']['output'];
  createdAt: Scalars['DateTime']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  method: Scalars['String']['output'];
  refunds: Array<Refund>;
  state: Scalars['String']['output'];
  transactionId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

/** Returned when a Payment is declined by the payment provider. */
export type PaymentDeclinedError = ErrorResult & {
  __typename?: 'PaymentDeclinedError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
  paymentErrorMessage: Scalars['String']['output'];
};

/** Returned when a Payment fails due to an error. */
export type PaymentFailedError = ErrorResult & {
  __typename?: 'PaymentFailedError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
  paymentErrorMessage: Scalars['String']['output'];
};

/** Passed as input to the `addPaymentToOrder` mutation. */
export type PaymentInput = {
  /**
   * This field should contain arbitrary data passed to the specified PaymentMethodHandler's `createPayment()` method
   * as the "metadata" argument. For example, it could contain an ID for the payment and other
   * data generated by the payment provider.
   */
  metadata: Scalars['JSON']['input'];
  /** This field should correspond to the `code` property of a PaymentMethod. */
  method: Scalars['String']['input'];
};

export type PaymentMethod = Node & {
  __typename?: 'PaymentMethod';
  checker?: Maybe<ConfigurableOperation>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  description: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  handler: ConfigurableOperation;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  translations: Array<PaymentMethodTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PaymentMethodQuote = {
  __typename?: 'PaymentMethodQuote';
  code: Scalars['String']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  description: Scalars['String']['output'];
  eligibilityMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isEligible: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type PaymentMethodTranslation = {
  __typename?: 'PaymentMethodTranslation';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/**
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 *
 * ## Understanding Permission.Owner
 *
 * `Permission.Owner` is a special permission which is used in some Vendure resolvers to indicate that that resolver should only
 * be accessible to the "owner" of that resource.
 *
 * For example, the Shop API `activeCustomer` query resolver should only return the Customer object for the "owner" of that Customer, i.e.
 * based on the activeUserId of the current session. As a result, the resolver code looks like this:
 *
 * @example
 * ```TypeScript
 * \@Query()
 * \@Allow(Permission.Owner)
 * async activeCustomer(\@Ctx() ctx: RequestContext): Promise<Customer | undefined> {
 *   const userId = ctx.activeUserId;
 *   if (userId) {
 *     return this.customerService.findOneByUserId(ctx, userId);
 *   }
 * }
 * ```
 *
 * Here we can see that the "ownership" must be enforced by custom logic inside the resolver. Since "ownership" cannot be defined generally
 * nor statically encoded at build-time, any resolvers using `Permission.Owner` **must** include logic to enforce that only the owner
 * of the resource has access. If not, then it is the equivalent of using `Permission.Public`.
 *
 *
 * @docsCategory common
 */
export enum Permission {
  /** Authenticated means simply that the user is logged in */
  Authenticated = 'Authenticated',
  /** Grants permission to create Administrator */
  CreateAdministrator = 'CreateAdministrator',
  /** Grants permission to create Asset */
  CreateAsset = 'CreateAsset',
  /** Grants permission to create Products, Facets, Assets, Collections */
  CreateCatalog = 'CreateCatalog',
  /** Grants permission to create Channel */
  CreateChannel = 'CreateChannel',
  /** Grants permission to create Collection */
  CreateCollection = 'CreateCollection',
  /** Grants permission to create Country */
  CreateCountry = 'CreateCountry',
  /** Grants permission to create Customer */
  CreateCustomer = 'CreateCustomer',
  /** Grants permission to create CustomerGroup */
  CreateCustomerGroup = 'CreateCustomerGroup',
  /** Grants permission to create Facet */
  CreateFacet = 'CreateFacet',
  /** Grants permission to create Order */
  CreateOrder = 'CreateOrder',
  /** Grants permission to create PaymentMethod */
  CreatePaymentMethod = 'CreatePaymentMethod',
  /** Grants permission to create Product */
  CreateProduct = 'CreateProduct',
  /** Grants permission to create Promotion */
  CreatePromotion = 'CreatePromotion',
  /** Grants permission to create Seller */
  CreateSeller = 'CreateSeller',
  /** Grants permission to create PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  CreateSettings = 'CreateSettings',
  /** Grants permission to create ShippingMethod */
  CreateShippingMethod = 'CreateShippingMethod',
  /** Grants permission to create StockLocation */
  CreateStockLocation = 'CreateStockLocation',
  /** Grants permission to create System */
  CreateSystem = 'CreateSystem',
  /** Grants permission to create Tag */
  CreateTag = 'CreateTag',
  /** Grants permission to create TaxCategory */
  CreateTaxCategory = 'CreateTaxCategory',
  /** Grants permission to create TaxRate */
  CreateTaxRate = 'CreateTaxRate',
  /** Grants permission to create Zone */
  CreateZone = 'CreateZone',
  /** Grants permission to delete Administrator */
  DeleteAdministrator = 'DeleteAdministrator',
  /** Grants permission to delete Asset */
  DeleteAsset = 'DeleteAsset',
  /** Grants permission to delete Products, Facets, Assets, Collections */
  DeleteCatalog = 'DeleteCatalog',
  /** Grants permission to delete Channel */
  DeleteChannel = 'DeleteChannel',
  /** Grants permission to delete Collection */
  DeleteCollection = 'DeleteCollection',
  /** Grants permission to delete Country */
  DeleteCountry = 'DeleteCountry',
  /** Grants permission to delete Customer */
  DeleteCustomer = 'DeleteCustomer',
  /** Grants permission to delete CustomerGroup */
  DeleteCustomerGroup = 'DeleteCustomerGroup',
  /** Grants permission to delete Facet */
  DeleteFacet = 'DeleteFacet',
  /** Grants permission to delete Order */
  DeleteOrder = 'DeleteOrder',
  /** Grants permission to delete PaymentMethod */
  DeletePaymentMethod = 'DeletePaymentMethod',
  /** Grants permission to delete Product */
  DeleteProduct = 'DeleteProduct',
  /** Grants permission to delete Promotion */
  DeletePromotion = 'DeletePromotion',
  /** Grants permission to delete Seller */
  DeleteSeller = 'DeleteSeller',
  /** Grants permission to delete PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  DeleteSettings = 'DeleteSettings',
  /** Grants permission to delete ShippingMethod */
  DeleteShippingMethod = 'DeleteShippingMethod',
  /** Grants permission to delete StockLocation */
  DeleteStockLocation = 'DeleteStockLocation',
  /** Grants permission to delete System */
  DeleteSystem = 'DeleteSystem',
  /** Grants permission to delete Tag */
  DeleteTag = 'DeleteTag',
  /** Grants permission to delete TaxCategory */
  DeleteTaxCategory = 'DeleteTaxCategory',
  /** Grants permission to delete TaxRate */
  DeleteTaxRate = 'DeleteTaxRate',
  /** Grants permission to delete Zone */
  DeleteZone = 'DeleteZone',
  /** Owner means the user owns this entity, e.g. a Customer's own Order */
  Owner = 'Owner',
  /** Public means any unauthenticated user may perform the operation */
  Public = 'Public',
  /** Grants permission to read Administrator */
  ReadAdministrator = 'ReadAdministrator',
  /** Grants permission to read Asset */
  ReadAsset = 'ReadAsset',
  /** Grants permission to read Products, Facets, Assets, Collections */
  ReadCatalog = 'ReadCatalog',
  /** Grants permission to read Channel */
  ReadChannel = 'ReadChannel',
  /** Grants permission to read Collection */
  ReadCollection = 'ReadCollection',
  /** Grants permission to read Country */
  ReadCountry = 'ReadCountry',
  /** Grants permission to read Customer */
  ReadCustomer = 'ReadCustomer',
  /** Grants permission to read CustomerGroup */
  ReadCustomerGroup = 'ReadCustomerGroup',
  /** Grants permission to read Facet */
  ReadFacet = 'ReadFacet',
  /** Grants permission to read Order */
  ReadOrder = 'ReadOrder',
  /** Grants permission to read PaymentMethod */
  ReadPaymentMethod = 'ReadPaymentMethod',
  /** Grants permission to read Product */
  ReadProduct = 'ReadProduct',
  /** Grants permission to read Promotion */
  ReadPromotion = 'ReadPromotion',
  /** Grants permission to read Seller */
  ReadSeller = 'ReadSeller',
  /** Grants permission to read PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  ReadSettings = 'ReadSettings',
  /** Grants permission to read ShippingMethod */
  ReadShippingMethod = 'ReadShippingMethod',
  /** Grants permission to read StockLocation */
  ReadStockLocation = 'ReadStockLocation',
  /** Grants permission to read System */
  ReadSystem = 'ReadSystem',
  /** Grants permission to read Tag */
  ReadTag = 'ReadTag',
  /** Grants permission to read TaxCategory */
  ReadTaxCategory = 'ReadTaxCategory',
  /** Grants permission to read TaxRate */
  ReadTaxRate = 'ReadTaxRate',
  /** Grants permission to read Zone */
  ReadZone = 'ReadZone',
  /** SuperAdmin has unrestricted access to all operations */
  SuperAdmin = 'SuperAdmin',
  /** Grants permission to update Administrator */
  UpdateAdministrator = 'UpdateAdministrator',
  /** Grants permission to update Asset */
  UpdateAsset = 'UpdateAsset',
  /** Grants permission to update Products, Facets, Assets, Collections */
  UpdateCatalog = 'UpdateCatalog',
  /** Grants permission to update Channel */
  UpdateChannel = 'UpdateChannel',
  /** Grants permission to update Collection */
  UpdateCollection = 'UpdateCollection',
  /** Grants permission to update Country */
  UpdateCountry = 'UpdateCountry',
  /** Grants permission to update Customer */
  UpdateCustomer = 'UpdateCustomer',
  /** Grants permission to update CustomerGroup */
  UpdateCustomerGroup = 'UpdateCustomerGroup',
  /** Grants permission to update Facet */
  UpdateFacet = 'UpdateFacet',
  /** Grants permission to update GlobalSettings */
  UpdateGlobalSettings = 'UpdateGlobalSettings',
  /** Grants permission to update Order */
  UpdateOrder = 'UpdateOrder',
  /** Grants permission to update PaymentMethod */
  UpdatePaymentMethod = 'UpdatePaymentMethod',
  /** Grants permission to update Product */
  UpdateProduct = 'UpdateProduct',
  /** Grants permission to update Promotion */
  UpdatePromotion = 'UpdatePromotion',
  /** Grants permission to update Seller */
  UpdateSeller = 'UpdateSeller',
  /** Grants permission to update PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  UpdateSettings = 'UpdateSettings',
  /** Grants permission to update ShippingMethod */
  UpdateShippingMethod = 'UpdateShippingMethod',
  /** Grants permission to update StockLocation */
  UpdateStockLocation = 'UpdateStockLocation',
  /** Grants permission to update System */
  UpdateSystem = 'UpdateSystem',
  /** Grants permission to update Tag */
  UpdateTag = 'UpdateTag',
  /** Grants permission to update TaxCategory */
  UpdateTaxCategory = 'UpdateTaxCategory',
  /** Grants permission to update TaxRate */
  UpdateTaxRate = 'UpdateTaxRate',
  /** Grants permission to update Zone */
  UpdateZone = 'UpdateZone'
}

export type Point = Node & {
  __typename?: 'Point';
  createdAt: Scalars['DateTime']['output'];
  expireAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  parentId?: Maybe<Scalars['ID']['output']>;
  point: Scalars['Int']['output'];
  reason: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** The price range where the result has more than one price */
export type PriceRange = {
  __typename?: 'PriceRange';
  max: Scalars['Money']['output'];
  min: Scalars['Money']['output'];
};

export type Product = Node & {
  __typename?: 'Product';
  assets: Array<Asset>;
  collections: Array<Collection>;
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<ProductCustomFields>;
  description: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  facetValues: Array<FacetValue>;
  featuredAsset?: Maybe<Asset>;
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  optionGroups: Array<ProductOptionGroup>;
  slug: Scalars['String']['output'];
  translations: Array<ProductTranslation>;
  updatedAt: Scalars['DateTime']['output'];
  /** Returns a paginated, sortable, filterable list of ProductVariants */
  variantList: ProductVariantList;
  /** Returns all ProductVariants */
  variants: Array<ProductVariant>;
};


export type ProductVariantListArgs = {
  options?: InputMaybe<ProductVariantListOptions>;
};

export type ProductCustomFields = {
  __typename?: 'ProductCustomFields';
  likeCount?: Maybe<Scalars['Int']['output']>;
  originalPrice?: Maybe<Scalars['Int']['output']>;
  shortDescription?: Maybe<Scalars['String']['output']>;
};

export type ProductFilterParameter = {
  _and?: InputMaybe<Array<ProductFilterParameter>>;
  _or?: InputMaybe<Array<ProductFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  description?: InputMaybe<StringOperators>;
  enabled?: InputMaybe<BooleanOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  likeCount?: InputMaybe<NumberOperators>;
  name?: InputMaybe<StringOperators>;
  originalPrice?: InputMaybe<NumberOperators>;
  shortDescription?: InputMaybe<StringOperators>;
  slug?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type ProductList = PaginatedList & {
  __typename?: 'ProductList';
  items: Array<Product>;
  totalItems: Scalars['Int']['output'];
};

export type ProductListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ProductFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ProductSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductOption = Node & {
  __typename?: 'ProductOption';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  group: ProductOptionGroup;
  groupId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  translations: Array<ProductOptionTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductOptionGroup = Node & {
  __typename?: 'ProductOptionGroup';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  options: Array<ProductOption>;
  translations: Array<ProductOptionGroupTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductOptionGroupTranslation = {
  __typename?: 'ProductOptionGroupTranslation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductOptionTranslation = {
  __typename?: 'ProductOptionTranslation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  likeCount?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  originalPrice?: InputMaybe<SortOrder>;
  shortDescription?: InputMaybe<SortOrder>;
  slug?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProductTranslation = {
  __typename?: 'ProductTranslation';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductVariant = Node & {
  __typename?: 'ProductVariant';
  assets: Array<Asset>;
  createdAt: Scalars['DateTime']['output'];
  currencyCode: CurrencyCode;
  customFields?: Maybe<Scalars['JSON']['output']>;
  facetValues: Array<FacetValue>;
  featuredAsset?: Maybe<Asset>;
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  options: Array<ProductOption>;
  price: Scalars['Money']['output'];
  priceWithTax: Scalars['Money']['output'];
  product: Product;
  productId: Scalars['ID']['output'];
  sku: Scalars['String']['output'];
  stockLevel: Scalars['String']['output'];
  taxCategory: TaxCategory;
  taxRateApplied: TaxRate;
  translations: Array<ProductVariantTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ProductVariantFilterParameter = {
  _and?: InputMaybe<Array<ProductVariantFilterParameter>>;
  _or?: InputMaybe<Array<ProductVariantFilterParameter>>;
  createdAt?: InputMaybe<DateOperators>;
  currencyCode?: InputMaybe<StringOperators>;
  id?: InputMaybe<IdOperators>;
  languageCode?: InputMaybe<StringOperators>;
  name?: InputMaybe<StringOperators>;
  price?: InputMaybe<NumberOperators>;
  priceWithTax?: InputMaybe<NumberOperators>;
  productId?: InputMaybe<IdOperators>;
  sku?: InputMaybe<StringOperators>;
  stockLevel?: InputMaybe<StringOperators>;
  updatedAt?: InputMaybe<DateOperators>;
};

export type ProductVariantList = PaginatedList & {
  __typename?: 'ProductVariantList';
  items: Array<ProductVariant>;
  totalItems: Scalars['Int']['output'];
};

export type ProductVariantListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ProductVariantFilterParameter>;
  /** Specifies whether multiple top-level "filter" fields should be combined with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>;
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ProductVariantSortParameter>;
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type ProductVariantSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
  priceWithTax?: InputMaybe<SortOrder>;
  productId?: InputMaybe<SortOrder>;
  sku?: InputMaybe<SortOrder>;
  stockLevel?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type ProductVariantTranslation = {
  __typename?: 'ProductVariantTranslation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Promotion = Node & {
  __typename?: 'Promotion';
  actions: Array<ConfigurableOperation>;
  conditions: Array<ConfigurableOperation>;
  couponCode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  description: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  endsAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  perCustomerUsageLimit?: Maybe<Scalars['Int']['output']>;
  startsAt?: Maybe<Scalars['DateTime']['output']>;
  translations: Array<PromotionTranslation>;
  updatedAt: Scalars['DateTime']['output'];
  usageLimit?: Maybe<Scalars['Int']['output']>;
};

export type PromotionList = PaginatedList & {
  __typename?: 'PromotionList';
  items: Array<Promotion>;
  totalItems: Scalars['Int']['output'];
};

export type PromotionTranslation = {
  __typename?: 'PromotionTranslation';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Province = Node & Region & {
  __typename?: 'Province';
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  parent?: Maybe<Region>;
  parentId?: Maybe<Scalars['ID']['output']>;
  translations: Array<RegionTranslation>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ProvinceList = PaginatedList & {
  __typename?: 'ProvinceList';
  items: Array<Province>;
  totalItems: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** The active Channel */
  activeChannel: Channel;
  /** The active Customer */
  activeCustomer?: Maybe<Customer>;
  /**
   * The active Order. Will be `null` until an Order is created via `addItemToOrder`. Once an Order reaches the
   * state of `PaymentAuthorized` or `PaymentSettled`, then that Order is no longer considered "active" and this
   * query will once again return `null`.
   */
  activeOrder?: Maybe<Order>;
  /** An array of supported Countries */
  availableCountries: Array<Country>;
  checkEmailExist: Success;
  /** Returns a Collection either by its id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
  collection?: Maybe<Collection>;
  /** A list of Collections available to the shop */
  collections: CollectionList;
  /** Returns a list of payment methods and their eligibility based on the current active Order */
  eligiblePaymentMethods: Array<PaymentMethodQuote>;
  /** Returns a list of eligible shipping methods based on the current active Order */
  eligibleShippingMethods: Array<ShippingMethodQuote>;
  /** Returns a Facet by its id */
  facet?: Maybe<Facet>;
  /** A list of Facets available to the shop */
  facets: FacetList;
  /** Returns information about the current authenticated User */
  me?: Maybe<CurrentUser>;
  myCoupons: Array<Coupon>;
  myPoints: Array<Point>;
  /** Returns the possible next states that the activeOrder can transition to */
  nextOrderStates: Array<Scalars['String']['output']>;
  /**
   * Returns an Order based on the id. Note that in the Shop API, only orders belonging to the
   * currently-authenticated User may be queried.
   */
  order?: Maybe<Order>;
  /**
   * Returns an Order based on the order `code`. For guest Orders (i.e. Orders placed by non-authenticated Customers)
   * this query will only return the Order within 2 hours of the Order being placed. This allows an Order confirmation
   * screen to be shown immediately after completion of a guest checkout, yet prevents security risks of allowing
   * general anonymous access to Order data.
   */
  orderByCode?: Maybe<Order>;
  /** Get a Product either by id or slug. If neither 'id' nor 'slug' is specified, an error will result. */
  product?: Maybe<Product>;
  /** Get a list of Products */
  products: ProductList;
  /** Search Products based on the criteria set by the `SearchInput` */
  search: SearchResponse;
};


export type QueryCheckEmailExistArgs = {
  emailAddress: Scalars['String']['input'];
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionsArgs = {
  options?: InputMaybe<CollectionListOptions>;
};


export type QueryFacetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFacetsArgs = {
  options?: InputMaybe<FacetListOptions>;
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrderByCodeArgs = {
  code: Scalars['String']['input'];
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  options?: InputMaybe<ProductListOptions>;
};


export type QuerySearchArgs = {
  input: SearchInput;
};

export type RefreshCustomerVerificationResult = NativeAuthStrategyError | Success;

export type Refund = Node & {
  __typename?: 'Refund';
  adjustment: Scalars['Money']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  items: Scalars['Money']['output'];
  lines: Array<RefundLine>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  method?: Maybe<Scalars['String']['output']>;
  paymentId: Scalars['ID']['output'];
  reason?: Maybe<Scalars['String']['output']>;
  shipping: Scalars['Money']['output'];
  state: Scalars['String']['output'];
  total: Scalars['Money']['output'];
  transactionId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type RefundLine = {
  __typename?: 'RefundLine';
  orderLine: OrderLine;
  orderLineId: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
  refund: Refund;
  refundId: Scalars['ID']['output'];
};

export type Region = {
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  parent?: Maybe<Region>;
  parentId?: Maybe<Scalars['ID']['output']>;
  translations: Array<RegionTranslation>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RegionTranslation = {
  __typename?: 'RegionTranslation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type RegisterCustomerAccountResult = MissingPasswordError | NativeAuthStrategyError | PasswordValidationError | Success;

export type RegisterCustomerCustomFieldsInput = {
  invitorId?: InputMaybe<Scalars['ID']['input']>;
};

export type RegisterCustomerInput = {
  customFields?: InputMaybe<RegisterCustomerCustomFieldsInput>;
  emailAddress: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterCustomerInviteCodeError = ErrorResult & {
  __typename?: 'RegisterCustomerInviteCodeError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type RegisterCustomerInviteCodeResult = RegisterCustomerInviteCodeError | Success;

export type RelationCustomFieldConfig = CustomField & {
  __typename?: 'RelationCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  entity: Scalars['String']['output'];
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  scalarFields: Array<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type RemoveOrderItemsResult = Order | OrderModificationError;

export type RequestPasswordResetResult = NativeAuthStrategyError | Success;

export type RequestUpdateCustomerEmailAddressResult = EmailAddressConflictError | InvalidCredentialsError | NativeAuthStrategyError | Success;

export type ResetPasswordResult = CurrentUser | NativeAuthStrategyError | NotVerifiedError | PasswordResetTokenExpiredError | PasswordResetTokenInvalidError | PasswordValidationError;

export type Role = Node & {
  __typename?: 'Role';
  channels: Array<Channel>;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  permissions: Array<Permission>;
  updatedAt: Scalars['DateTime']['output'];
};

export type RoleList = PaginatedList & {
  __typename?: 'RoleList';
  items: Array<Role>;
  totalItems: Scalars['Int']['output'];
};

export type SearchInput = {
  collectionId?: InputMaybe<Scalars['ID']['input']>;
  collectionSlug?: InputMaybe<Scalars['String']['input']>;
  facetValueFilters?: InputMaybe<Array<FacetValueFilterInput>>;
  groupByProduct?: InputMaybe<Scalars['Boolean']['input']>;
  inStock?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<SearchResultSortParameter>;
  take?: InputMaybe<Scalars['Int']['input']>;
  term?: InputMaybe<Scalars['String']['input']>;
};

export type SearchReindexResponse = {
  __typename?: 'SearchReindexResponse';
  success: Scalars['Boolean']['output'];
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  collections: Array<CollectionResult>;
  facetValues: Array<FacetValueResult>;
  items: Array<SearchResult>;
  totalItems: Scalars['Int']['output'];
};

export type SearchResult = {
  __typename?: 'SearchResult';
  /** An array of ids of the Collections in which this result appears */
  collectionIds: Array<Scalars['ID']['output']>;
  currencyCode: CurrencyCode;
  description: Scalars['String']['output'];
  facetIds: Array<Scalars['ID']['output']>;
  facetValueIds: Array<Scalars['ID']['output']>;
  inStock: Scalars['Boolean']['output'];
  isLike?: Maybe<Scalars['Boolean']['output']>;
  originalPrice?: Maybe<Scalars['Money']['output']>;
  price: SearchResultPrice;
  priceWithTax: SearchResultPrice;
  productAsset?: Maybe<SearchResultAsset>;
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  productVariantAsset?: Maybe<SearchResultAsset>;
  productVariantId: Scalars['ID']['output'];
  productVariantName: Scalars['String']['output'];
  /** A relevance score for the result. Differs between database implementations */
  score: Scalars['Float']['output'];
  sku: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type SearchResultAsset = {
  __typename?: 'SearchResultAsset';
  focalPoint?: Maybe<Coordinate>;
  id: Scalars['ID']['output'];
  preview: Scalars['String']['output'];
};

/** The price of a search result product, either as a range or as a single price */
export type SearchResultPrice = PriceRange | SinglePrice;

export type SearchResultSortParameter = {
  createdAt?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  price?: InputMaybe<SortOrder>;
};

export type Seller = Node & {
  __typename?: 'Seller';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SetCustomerForOrderResult = AlreadyLoggedInError | EmailAddressConflictError | GuestCheckoutError | NoActiveOrderError | Order;

export type SetOrderShippingMethodResult = IneligibleShippingMethodError | NoActiveOrderError | Order | OrderModificationError;

export type ShippingLine = {
  __typename?: 'ShippingLine';
  discountedPrice: Scalars['Money']['output'];
  discountedPriceWithTax: Scalars['Money']['output'];
  discounts: Array<Discount>;
  id: Scalars['ID']['output'];
  price: Scalars['Money']['output'];
  priceWithTax: Scalars['Money']['output'];
  shippingMethod: ShippingMethod;
};

export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod';
  calculator: ConfigurableOperation;
  checker: ConfigurableOperation;
  code: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  description: Scalars['String']['output'];
  fulfillmentHandlerCode: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  translations: Array<ShippingMethodTranslation>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ShippingMethodList = PaginatedList & {
  __typename?: 'ShippingMethodList';
  items: Array<ShippingMethod>;
  totalItems: Scalars['Int']['output'];
};

export type ShippingMethodQuote = {
  __typename?: 'ShippingMethodQuote';
  code: Scalars['String']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  /** Any optional metadata returned by the ShippingCalculator in the ShippingCalculationResult */
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Money']['output'];
  priceWithTax: Scalars['Money']['output'];
};

export type ShippingMethodTranslation = {
  __typename?: 'ShippingMethodTranslation';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  languageCode: LanguageCode;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

/** The price value where the result has a single price */
export type SinglePrice = {
  __typename?: 'SinglePrice';
  value: Scalars['Money']['output'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringCustomFieldConfig = CustomField & {
  __typename?: 'StringCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  length?: Maybe<Scalars['Int']['output']>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  options?: Maybe<Array<StringFieldOption>>;
  pattern?: Maybe<Scalars['String']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type StringFieldOption = {
  __typename?: 'StringFieldOption';
  label?: Maybe<Array<LocalizedString>>;
  value: Scalars['String']['output'];
};

/** Operators for filtering on a list of String fields */
export type StringListOperators = {
  inList: Scalars['String']['input'];
};

/** Operators for filtering on a String field */
export type StringOperators = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  notContains?: InputMaybe<Scalars['String']['input']>;
  notEq?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  regex?: InputMaybe<Scalars['String']['input']>;
};

/** Indicates that an operation succeeded, where we do not want to return any more specific information. */
export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean']['output'];
};

export type Surcharge = Node & {
  __typename?: 'Surcharge';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  price: Scalars['Money']['output'];
  priceWithTax: Scalars['Money']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  taxLines: Array<TaxLine>;
  taxRate: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Tag = Node & {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export type TagList = PaginatedList & {
  __typename?: 'TagList';
  items: Array<Tag>;
  totalItems: Scalars['Int']['output'];
};

export type TaxCategory = Node & {
  __typename?: 'TaxCategory';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  isDefault: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TaxLine = {
  __typename?: 'TaxLine';
  description: Scalars['String']['output'];
  taxRate: Scalars['Float']['output'];
};

export type TaxRate = Node & {
  __typename?: 'TaxRate';
  category: TaxCategory;
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  customerGroup?: Maybe<CustomerGroup>;
  enabled: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Float']['output'];
  zone: Zone;
};

export type TaxRateList = PaginatedList & {
  __typename?: 'TaxRateList';
  items: Array<TaxRate>;
  totalItems: Scalars['Int']['output'];
};

export type TextCustomFieldConfig = CustomField & {
  __typename?: 'TextCustomFieldConfig';
  description?: Maybe<Array<LocalizedString>>;
  internal?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Array<LocalizedString>>;
  list: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  nullable?: Maybe<Scalars['Boolean']['output']>;
  readonly?: Maybe<Scalars['Boolean']['output']>;
  type: Scalars['String']['output'];
  ui?: Maybe<Scalars['JSON']['output']>;
};

export type TransitionOrderToStateResult = Order | OrderStateTransitionError;

export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  customFields?: InputMaybe<Scalars['JSON']['input']>;
  defaultBillingAddress?: InputMaybe<Scalars['Boolean']['input']>;
  defaultShippingAddress?: InputMaybe<Scalars['Boolean']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
  streetLine1?: InputMaybe<Scalars['String']['input']>;
  streetLine2?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerCustomFieldsInput = {
  invitorId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateCustomerEmailAddressResult = IdentifierChangeTokenExpiredError | IdentifierChangeTokenInvalidError | NativeAuthStrategyError | Success;

export type UpdateCustomerInput = {
  customFields?: InputMaybe<UpdateCustomerCustomFieldsInput>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerPasswordResult = InvalidCredentialsError | NativeAuthStrategyError | PasswordValidationError | Success;

export type UpdateOrderInput = {
  customFields?: InputMaybe<Scalars['JSON']['input']>;
};

export type UpdateOrderItemsResult = InsufficientStockError | NegativeQuantityError | Order | OrderLimitError | OrderModificationError;

export type UseCouponError = ErrorResult & {
  __typename?: 'UseCouponError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type UseCouponResult = Success | UseCouponError;

export type User = Node & {
  __typename?: 'User';
  authenticationMethods: Array<AuthenticationMethod>;
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  lastLogin?: Maybe<Scalars['DateTime']['output']>;
  roles: Array<Role>;
  updatedAt: Scalars['DateTime']['output'];
  verified: Scalars['Boolean']['output'];
};

/**
 * Returned if the verification token (used to verify a Customer's email address) is valid, but has
 * expired according to the `verificationTokenDuration` setting in the AuthOptions.
 */
export type VerificationTokenExpiredError = ErrorResult & {
  __typename?: 'VerificationTokenExpiredError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

/**
 * Returned if the verification token (used to verify a Customer's email address) is either
 * invalid or does not match any expected tokens.
 */
export type VerificationTokenInvalidError = ErrorResult & {
  __typename?: 'VerificationTokenInvalidError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type VerifyCustomerAccountResult = CurrentUser | MissingPasswordError | NativeAuthStrategyError | PasswordAlreadySetError | PasswordValidationError | VerificationTokenExpiredError | VerificationTokenInvalidError;

export type Zone = Node & {
  __typename?: 'Zone';
  createdAt: Scalars['DateTime']['output'];
  customFields?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['ID']['output'];
  members: Array<Region>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ActiveCustomerQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveCustomerQuery = { __typename?: 'Query', activeCustomer?: { __typename?: 'Customer', id: string, firstName: string, phoneNumber?: string | null, emailAddress: string } | null };

export type SimpleCollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type SimpleCollectionsQuery = { __typename?: 'Query', collections: { __typename?: 'CollectionList', items: Array<{ __typename?: 'Collection', id: string, name: string, parentId: string, children?: Array<{ __typename?: 'Collection', id: string, name: string, parentId: string, children?: Array<{ __typename?: 'Collection', id: string, name: string, parentId: string, children?: Array<{ __typename?: 'Collection', id: string, name: string, parentId: string, breadcrumbs: Array<{ __typename?: 'CollectionBreadcrumb', id: string, name: string }> }> | null, breadcrumbs: Array<{ __typename?: 'CollectionBreadcrumb', id: string, name: string }> }> | null, breadcrumbs: Array<{ __typename?: 'CollectionBreadcrumb', id: string, name: string }> }> | null, breadcrumbs: Array<{ __typename?: 'CollectionBreadcrumb', id: string, name: string }> }> } };

export type CheckEmailExistQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CheckEmailExistQuery = { __typename?: 'Query', checkEmailExist: { __typename?: 'Success', success: boolean } };

export type ProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, name: string, description: string, customFields?: { __typename?: 'ProductCustomFields', shortDescription?: string | null, originalPrice?: number | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, assets: Array<{ __typename: 'Asset', preview: string }>, variants: Array<{ __typename?: 'ProductVariant', id: string, name: string, stockLevel: string, priceWithTax: any, options: Array<{ __typename?: 'ProductOption', id: string, groupId: string }> }>, optionGroups: Array<{ __typename?: 'ProductOptionGroup', id: string, name: string, options: Array<{ __typename?: 'ProductOption', id: string, name: string }> }>, facetValues: Array<{ __typename?: 'FacetValue', id: string, name: string, code: string, facet: { __typename?: 'Facet', code: string } }> } | null };

export type ProductDetailFragment = { __typename?: 'Product', id: string, name: string, description: string, customFields?: { __typename?: 'ProductCustomFields', shortDescription?: string | null, originalPrice?: number | null } | null, featuredAsset?: { __typename?: 'Asset', preview: string } | null, assets: Array<{ __typename: 'Asset', preview: string }>, variants: Array<{ __typename?: 'ProductVariant', id: string, name: string, stockLevel: string, priceWithTax: any, options: Array<{ __typename?: 'ProductOption', id: string, groupId: string }> }>, optionGroups: Array<{ __typename?: 'ProductOptionGroup', id: string, name: string, options: Array<{ __typename?: 'ProductOption', id: string, name: string }> }>, facetValues: Array<{ __typename?: 'FacetValue', id: string, name: string, code: string, facet: { __typename?: 'Facet', code: string } }> };

export type SearchProductsQueryVariables = Exact<{
  collectionId?: InputMaybe<Scalars['ID']['input']>;
  sort?: InputMaybe<SearchResultSortParameter>;
  term?: InputMaybe<Scalars['String']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchProductsQuery = { __typename?: 'Query', search: { __typename?: 'SearchResponse', totalItems: number, items: Array<{ __typename?: 'SearchResult', productId: string, productName: string, originalPrice?: any | null, facetValueIds: Array<string>, description: string, inStock: boolean, isLike?: boolean | null, productAsset?: { __typename?: 'SearchResultAsset', preview: string } | null, priceWithTax: { __typename?: 'PriceRange', min: any, max: any } | { __typename?: 'SinglePrice' } }>, facetValues: Array<{ __typename?: 'FacetValueResult', facetValue: { __typename?: 'FacetValue', id: string, name: string, code: string, facet: { __typename?: 'Facet', code: string } } }> } };

export type ActiveOrderQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveOrderQuery = { __typename?: 'Query', activeOrder?: { __typename?: 'Order', shippingWithTax: any, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: any, quantity: number, productVariant: { __typename?: 'ProductVariant', id: string, name: string, stockLevel: string, priceWithTax: any, product: { __typename?: 'Product', id: string, name: string, customFields?: { __typename?: 'ProductCustomFields', originalPrice?: number | null } | null, facetValues: Array<{ __typename?: 'FacetValue', id: string, name: string, code: string, facet: { __typename?: 'Facet', code: string } }> }, options: Array<{ __typename?: 'ProductOption', name: string }> }, featuredAsset?: { __typename?: 'Asset', preview: string } | null }>, shippingLines: Array<{ __typename?: 'ShippingLine', priceWithTax: any, shippingMethod: { __typename?: 'ShippingMethod', id: string, calculator: { __typename?: 'ConfigurableOperation', args: Array<{ __typename?: 'ConfigArg', name: string, value: string }> } } }> } | null };

export type EligibleShippingMethodsQueryVariables = Exact<{ [key: string]: never; }>;


export type EligibleShippingMethodsQuery = { __typename?: 'Query', eligibleShippingMethods: Array<{ __typename?: 'ShippingMethodQuote', id: string, priceWithTax: any, metadata?: any | null }> };

export type MyCouponsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCouponsQuery = { __typename?: 'Query', myCoupons: Array<{ __typename?: 'Coupon', createdAt: any, expiresAt: any, state: string, code: string, couponTemplate: { __typename?: 'CouponTemplate', name: string, value: number } }> };

export type CartOrderLineFragment = { __typename?: 'OrderLine', id: string, unitPriceWithTax: any, quantity: number, productVariant: { __typename?: 'ProductVariant', id: string, name: string, stockLevel: string, priceWithTax: any, product: { __typename?: 'Product', id: string, name: string, customFields?: { __typename?: 'ProductCustomFields', originalPrice?: number | null } | null, facetValues: Array<{ __typename?: 'FacetValue', id: string, name: string, code: string, facet: { __typename?: 'Facet', code: string } }> }, options: Array<{ __typename?: 'ProductOption', name: string }> }, featuredAsset?: { __typename?: 'Asset', preview: string } | null };

export type SimpleCollectionFragment = { __typename?: 'Collection', id: string, name: string, parentId: string, breadcrumbs: Array<{ __typename?: 'CollectionBreadcrumb', id: string, name: string }> };

export type SearchResultProductFragment = { __typename?: 'SearchResult', productId: string, productName: string, originalPrice?: any | null, facetValueIds: Array<string>, description: string, inStock: boolean, isLike?: boolean | null, productAsset?: { __typename?: 'SearchResultAsset', preview: string } | null, priceWithTax: { __typename?: 'PriceRange', min: any, max: any } | { __typename?: 'SinglePrice' } };

export type SimpleFacetValueFragment = { __typename?: 'FacetValue', id: string, name: string, code: string, facet: { __typename?: 'Facet', code: string } };

export type KakaoAuthenticateMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type KakaoAuthenticateMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'CurrentUser', id: string, identifier: string } | { __typename?: 'InvalidCredentialsError' } | { __typename?: 'NotVerifiedError' } };

export type NaverAuthenticateMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type NaverAuthenticateMutation = { __typename?: 'Mutation', authenticate: { __typename?: 'CurrentUser', id: string, identifier: string } | { __typename?: 'InvalidCredentialsError' } | { __typename?: 'NotVerifiedError' } };

export type RequestPhoneAuthNumberMutationVariables = Exact<{
  number: Scalars['String']['input'];
}>;


export type RequestPhoneAuthNumberMutation = { __typename?: 'Mutation', generatePhoneAuthNumber: { __typename?: 'Success', success: boolean } };

export type VerifyPhoneAuthNumberMutationVariables = Exact<{
  number: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type VerifyPhoneAuthNumberMutation = { __typename?: 'Mutation', checkPhoneAuthNumber: { __typename?: 'Success', success: boolean } };

export type RegisterCustomerMutationVariables = Exact<{
  input: MeowtimesRegisterCustomerInput;
}>;


export type RegisterCustomerMutation = { __typename?: 'Mutation', meowtimesRegisterCustomerAccount: { __typename?: 'CustomerCreateError', errorCode: ErrorCode, message: string } | { __typename?: 'Success', success: boolean } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  rememberMe?: Scalars['Boolean']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'CurrentUser', id: string, identifier: string } | { __typename?: 'InvalidCredentialsError', errorCode: ErrorCode, message: string } | { __typename?: 'NativeAuthStrategyError', errorCode: ErrorCode, message: string } | { __typename?: 'NotVerifiedError', errorCode: ErrorCode, message: string } };

export type LikeProductMutationVariables = Exact<{
  productId: Scalars['ID']['input'];
  like: Scalars['Boolean']['input'];
}>;


export type LikeProductMutation = { __typename?: 'Mutation', setLikeProduct: { __typename?: 'Success', success: boolean } };

export type AddItemToOrderMutationVariables = Exact<{
  productVariantId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type AddItemToOrderMutation = { __typename?: 'Mutation', addItemToOrder: { __typename?: 'InsufficientStockError' } | { __typename?: 'NegativeQuantityError' } | { __typename?: 'Order', id: string, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: any, quantity: number, productVariant: { __typename?: 'ProductVariant', id: string, name: string, stockLevel: string, priceWithTax: any, product: { __typename?: 'Product', id: string, name: string, customFields?: { __typename?: 'ProductCustomFields', originalPrice?: number | null } | null, facetValues: Array<{ __typename?: 'FacetValue', id: string, name: string, code: string, facet: { __typename?: 'Facet', code: string } }> }, options: Array<{ __typename?: 'ProductOption', name: string }> }, featuredAsset?: { __typename?: 'Asset', preview: string } | null }> } | { __typename?: 'OrderLimitError' } | { __typename?: 'OrderModificationError' } };

export type AddItemsToOrderMutationVariables = Exact<{
  input: AddItemsToOrderInput;
}>;


export type AddItemsToOrderMutation = { __typename?: 'Mutation', addItemsToOrder: { __typename?: 'Order', id: string } };

export type RemoveOrderLineMutationVariables = Exact<{
  orderLineId: Scalars['ID']['input'];
}>;


export type RemoveOrderLineMutation = { __typename?: 'Mutation', removeOrderLine: { __typename?: 'Order', id: string, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: any, quantity: number, productVariant: { __typename?: 'ProductVariant', id: string, name: string, stockLevel: string, priceWithTax: any, product: { __typename?: 'Product', id: string, name: string, customFields?: { __typename?: 'ProductCustomFields', originalPrice?: number | null } | null, facetValues: Array<{ __typename?: 'FacetValue', id: string, name: string, code: string, facet: { __typename?: 'Facet', code: string } }> }, options: Array<{ __typename?: 'ProductOption', name: string }> }, featuredAsset?: { __typename?: 'Asset', preview: string } | null }> } | { __typename?: 'OrderModificationError' } };

export type RemoveOrderLinesMutationVariables = Exact<{
  orderLineIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type RemoveOrderLinesMutation = { __typename?: 'Mutation', removeOrderLines: { __typename?: 'Order', id: string } };

export type AdjustOrderLineMutationVariables = Exact<{
  orderLineId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type AdjustOrderLineMutation = { __typename?: 'Mutation', adjustOrderLine: { __typename?: 'InsufficientStockError' } | { __typename?: 'NegativeQuantityError' } | { __typename?: 'Order', id: string, lines: Array<{ __typename?: 'OrderLine', id: string, unitPriceWithTax: any, quantity: number, productVariant: { __typename?: 'ProductVariant', id: string, name: string, stockLevel: string, priceWithTax: any, product: { __typename?: 'Product', id: string, name: string, customFields?: { __typename?: 'ProductCustomFields', originalPrice?: number | null } | null, facetValues: Array<{ __typename?: 'FacetValue', id: string, name: string, code: string, facet: { __typename?: 'Facet', code: string } }> }, options: Array<{ __typename?: 'ProductOption', name: string }> }, featuredAsset?: { __typename?: 'Asset', preview: string } | null }> } | { __typename?: 'OrderLimitError' } | { __typename?: 'OrderModificationError' } };

export type SetOrderShippingMethodMutationVariables = Exact<{
  id: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type SetOrderShippingMethodMutation = { __typename?: 'Mutation', setOrderShippingMethod: { __typename?: 'IneligibleShippingMethodError' } | { __typename?: 'NoActiveOrderError' } | { __typename?: 'Order', id: string } | { __typename?: 'OrderModificationError' } };

export type UseCouponMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type UseCouponMutation = { __typename?: 'Mutation', useCoupon: { __typename?: 'Success', success: boolean } | { __typename?: 'UseCouponError', errorCode: ErrorCode, message: string } };

export const SimpleFacetValueFragmentDoc = gql`
    fragment SimpleFacetValue on FacetValue {
  id
  facet {
    code
  }
  name
  code
}
    `;
export const ProductDetailFragmentDoc = gql`
    fragment ProductDetail on Product {
  id
  name
  description
  customFields {
    shortDescription
    originalPrice
  }
  featuredAsset {
    preview
  }
  assets {
    __typename
    preview
  }
  variants {
    id
    name
    stockLevel
    options {
      id
      groupId
    }
    priceWithTax
  }
  optionGroups {
    id
    name
    options {
      id
      name
    }
  }
  facetValues {
    ...SimpleFacetValue
  }
}
    ${SimpleFacetValueFragmentDoc}`;
export const CartOrderLineFragmentDoc = gql`
    fragment CartOrderLine on OrderLine {
  id
  productVariant {
    id
    product {
      id
      customFields {
        originalPrice
      }
      name
      facetValues {
        ...SimpleFacetValue
      }
    }
    name
    options {
      name
    }
    stockLevel
    priceWithTax
  }
  featuredAsset {
    preview
  }
  unitPriceWithTax
  quantity
}
    ${SimpleFacetValueFragmentDoc}`;
export const SimpleCollectionFragmentDoc = gql`
    fragment SimpleCollection on Collection {
  id
  name
  parentId
  breadcrumbs {
    id
    name
  }
}
    `;
export const SearchResultProductFragmentDoc = gql`
    fragment SearchResultProduct on SearchResult {
  productId
  productName
  productAsset {
    preview
  }
  priceWithTax {
    ... on PriceRange {
      min
      max
    }
  }
  originalPrice
  facetValueIds
  description
  inStock
  isLike
}
    `;
export const ActiveCustomerDocument = gql`
    query activeCustomer {
  activeCustomer {
    id
    firstName
    phoneNumber
    emailAddress
  }
}
    `;

/**
 * __useActiveCustomerQuery__
 *
 * To run a query within a React component, call `useActiveCustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveCustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveCustomerQuery({
 *   variables: {
 *   },
 * });
 */
export function useActiveCustomerQuery(baseOptions?: Apollo.QueryHookOptions<ActiveCustomerQuery, ActiveCustomerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActiveCustomerQuery, ActiveCustomerQueryVariables>(ActiveCustomerDocument, options);
      }
export function useActiveCustomerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActiveCustomerQuery, ActiveCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActiveCustomerQuery, ActiveCustomerQueryVariables>(ActiveCustomerDocument, options);
        }
export function useActiveCustomerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ActiveCustomerQuery, ActiveCustomerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActiveCustomerQuery, ActiveCustomerQueryVariables>(ActiveCustomerDocument, options);
        }
export type ActiveCustomerQueryHookResult = ReturnType<typeof useActiveCustomerQuery>;
export type ActiveCustomerLazyQueryHookResult = ReturnType<typeof useActiveCustomerLazyQuery>;
export type ActiveCustomerSuspenseQueryHookResult = ReturnType<typeof useActiveCustomerSuspenseQuery>;
export type ActiveCustomerQueryResult = Apollo.QueryResult<ActiveCustomerQuery, ActiveCustomerQueryVariables>;
export const SimpleCollectionsDocument = gql`
    query simpleCollections {
  collections {
    items {
      ...SimpleCollection
      children {
        ...SimpleCollection
        children {
          ...SimpleCollection
          children {
            ...SimpleCollection
          }
        }
      }
    }
  }
}
    ${SimpleCollectionFragmentDoc}`;

/**
 * __useSimpleCollectionsQuery__
 *
 * To run a query within a React component, call `useSimpleCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimpleCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimpleCollectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSimpleCollectionsQuery(baseOptions?: Apollo.QueryHookOptions<SimpleCollectionsQuery, SimpleCollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SimpleCollectionsQuery, SimpleCollectionsQueryVariables>(SimpleCollectionsDocument, options);
      }
export function useSimpleCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SimpleCollectionsQuery, SimpleCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SimpleCollectionsQuery, SimpleCollectionsQueryVariables>(SimpleCollectionsDocument, options);
        }
export function useSimpleCollectionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SimpleCollectionsQuery, SimpleCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SimpleCollectionsQuery, SimpleCollectionsQueryVariables>(SimpleCollectionsDocument, options);
        }
export type SimpleCollectionsQueryHookResult = ReturnType<typeof useSimpleCollectionsQuery>;
export type SimpleCollectionsLazyQueryHookResult = ReturnType<typeof useSimpleCollectionsLazyQuery>;
export type SimpleCollectionsSuspenseQueryHookResult = ReturnType<typeof useSimpleCollectionsSuspenseQuery>;
export type SimpleCollectionsQueryResult = Apollo.QueryResult<SimpleCollectionsQuery, SimpleCollectionsQueryVariables>;
export const CheckEmailExistDocument = gql`
    query checkEmailExist($email: String!) {
  checkEmailExist(emailAddress: $email) {
    success
  }
}
    `;

/**
 * __useCheckEmailExistQuery__
 *
 * To run a query within a React component, call `useCheckEmailExistQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckEmailExistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckEmailExistQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCheckEmailExistQuery(baseOptions: Apollo.QueryHookOptions<CheckEmailExistQuery, CheckEmailExistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckEmailExistQuery, CheckEmailExistQueryVariables>(CheckEmailExistDocument, options);
      }
export function useCheckEmailExistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckEmailExistQuery, CheckEmailExistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckEmailExistQuery, CheckEmailExistQueryVariables>(CheckEmailExistDocument, options);
        }
export function useCheckEmailExistSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CheckEmailExistQuery, CheckEmailExistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckEmailExistQuery, CheckEmailExistQueryVariables>(CheckEmailExistDocument, options);
        }
export type CheckEmailExistQueryHookResult = ReturnType<typeof useCheckEmailExistQuery>;
export type CheckEmailExistLazyQueryHookResult = ReturnType<typeof useCheckEmailExistLazyQuery>;
export type CheckEmailExistSuspenseQueryHookResult = ReturnType<typeof useCheckEmailExistSuspenseQuery>;
export type CheckEmailExistQueryResult = Apollo.QueryResult<CheckEmailExistQuery, CheckEmailExistQueryVariables>;
export const ProductDocument = gql`
    query product($id: ID!) {
  product(id: $id) {
    ...ProductDetail
  }
}
    ${ProductDetailFragmentDoc}`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export function useProductSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductSuspenseQueryHookResult = ReturnType<typeof useProductSuspenseQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const SearchProductsDocument = gql`
    query searchProducts($collectionId: ID, $sort: SearchResultSortParameter, $term: String, $take: Int, $skip: Int) {
  search(
    input: {collectionId: $collectionId, sort: $sort, term: $term, take: $take, skip: $skip, groupByProduct: true}
  ) {
    items {
      ...SearchResultProduct
    }
    totalItems
    facetValues {
      facetValue {
        ...SimpleFacetValue
      }
    }
  }
}
    ${SearchResultProductFragmentDoc}
${SimpleFacetValueFragmentDoc}`;

/**
 * __useSearchProductsQuery__
 *
 * To run a query within a React component, call `useSearchProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProductsQuery({
 *   variables: {
 *      collectionId: // value for 'collectionId'
 *      sort: // value for 'sort'
 *      term: // value for 'term'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useSearchProductsQuery(baseOptions?: Apollo.QueryHookOptions<SearchProductsQuery, SearchProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProductsQuery, SearchProductsQueryVariables>(SearchProductsDocument, options);
      }
export function useSearchProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProductsQuery, SearchProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProductsQuery, SearchProductsQueryVariables>(SearchProductsDocument, options);
        }
export function useSearchProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchProductsQuery, SearchProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchProductsQuery, SearchProductsQueryVariables>(SearchProductsDocument, options);
        }
export type SearchProductsQueryHookResult = ReturnType<typeof useSearchProductsQuery>;
export type SearchProductsLazyQueryHookResult = ReturnType<typeof useSearchProductsLazyQuery>;
export type SearchProductsSuspenseQueryHookResult = ReturnType<typeof useSearchProductsSuspenseQuery>;
export type SearchProductsQueryResult = Apollo.QueryResult<SearchProductsQuery, SearchProductsQueryVariables>;
export const ActiveOrderDocument = gql`
    query activeOrder {
  activeOrder {
    lines {
      ...CartOrderLine
    }
    shippingWithTax
    shippingLines {
      shippingMethod {
        id
        calculator {
          args {
            name
            value
          }
        }
      }
      priceWithTax
    }
  }
}
    ${CartOrderLineFragmentDoc}`;

/**
 * __useActiveOrderQuery__
 *
 * To run a query within a React component, call `useActiveOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveOrderQuery({
 *   variables: {
 *   },
 * });
 */
export function useActiveOrderQuery(baseOptions?: Apollo.QueryHookOptions<ActiveOrderQuery, ActiveOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActiveOrderQuery, ActiveOrderQueryVariables>(ActiveOrderDocument, options);
      }
export function useActiveOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActiveOrderQuery, ActiveOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActiveOrderQuery, ActiveOrderQueryVariables>(ActiveOrderDocument, options);
        }
export function useActiveOrderSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ActiveOrderQuery, ActiveOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActiveOrderQuery, ActiveOrderQueryVariables>(ActiveOrderDocument, options);
        }
export type ActiveOrderQueryHookResult = ReturnType<typeof useActiveOrderQuery>;
export type ActiveOrderLazyQueryHookResult = ReturnType<typeof useActiveOrderLazyQuery>;
export type ActiveOrderSuspenseQueryHookResult = ReturnType<typeof useActiveOrderSuspenseQuery>;
export type ActiveOrderQueryResult = Apollo.QueryResult<ActiveOrderQuery, ActiveOrderQueryVariables>;
export const EligibleShippingMethodsDocument = gql`
    query eligibleShippingMethods {
  eligibleShippingMethods {
    id
    priceWithTax
    metadata
  }
}
    `;

/**
 * __useEligibleShippingMethodsQuery__
 *
 * To run a query within a React component, call `useEligibleShippingMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEligibleShippingMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEligibleShippingMethodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEligibleShippingMethodsQuery(baseOptions?: Apollo.QueryHookOptions<EligibleShippingMethodsQuery, EligibleShippingMethodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EligibleShippingMethodsQuery, EligibleShippingMethodsQueryVariables>(EligibleShippingMethodsDocument, options);
      }
export function useEligibleShippingMethodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EligibleShippingMethodsQuery, EligibleShippingMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EligibleShippingMethodsQuery, EligibleShippingMethodsQueryVariables>(EligibleShippingMethodsDocument, options);
        }
export function useEligibleShippingMethodsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<EligibleShippingMethodsQuery, EligibleShippingMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EligibleShippingMethodsQuery, EligibleShippingMethodsQueryVariables>(EligibleShippingMethodsDocument, options);
        }
export type EligibleShippingMethodsQueryHookResult = ReturnType<typeof useEligibleShippingMethodsQuery>;
export type EligibleShippingMethodsLazyQueryHookResult = ReturnType<typeof useEligibleShippingMethodsLazyQuery>;
export type EligibleShippingMethodsSuspenseQueryHookResult = ReturnType<typeof useEligibleShippingMethodsSuspenseQuery>;
export type EligibleShippingMethodsQueryResult = Apollo.QueryResult<EligibleShippingMethodsQuery, EligibleShippingMethodsQueryVariables>;
export const MyCouponsDocument = gql`
    query myCoupons {
  myCoupons {
    createdAt
    expiresAt
    state
    couponTemplate {
      name
      value
    }
    code
  }
}
    `;

/**
 * __useMyCouponsQuery__
 *
 * To run a query within a React component, call `useMyCouponsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCouponsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCouponsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyCouponsQuery(baseOptions?: Apollo.QueryHookOptions<MyCouponsQuery, MyCouponsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCouponsQuery, MyCouponsQueryVariables>(MyCouponsDocument, options);
      }
export function useMyCouponsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCouponsQuery, MyCouponsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCouponsQuery, MyCouponsQueryVariables>(MyCouponsDocument, options);
        }
export function useMyCouponsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyCouponsQuery, MyCouponsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyCouponsQuery, MyCouponsQueryVariables>(MyCouponsDocument, options);
        }
export type MyCouponsQueryHookResult = ReturnType<typeof useMyCouponsQuery>;
export type MyCouponsLazyQueryHookResult = ReturnType<typeof useMyCouponsLazyQuery>;
export type MyCouponsSuspenseQueryHookResult = ReturnType<typeof useMyCouponsSuspenseQuery>;
export type MyCouponsQueryResult = Apollo.QueryResult<MyCouponsQuery, MyCouponsQueryVariables>;
export const KakaoAuthenticateDocument = gql`
    mutation kakaoAuthenticate($code: String!) {
  authenticate(input: {kakao: {code: $code}}) {
    ... on CurrentUser {
      id
      identifier
    }
  }
}
    `;
export type KakaoAuthenticateMutationFn = Apollo.MutationFunction<KakaoAuthenticateMutation, KakaoAuthenticateMutationVariables>;

/**
 * __useKakaoAuthenticateMutation__
 *
 * To run a mutation, you first call `useKakaoAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKakaoAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [kakaoAuthenticateMutation, { data, loading, error }] = useKakaoAuthenticateMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useKakaoAuthenticateMutation(baseOptions?: Apollo.MutationHookOptions<KakaoAuthenticateMutation, KakaoAuthenticateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<KakaoAuthenticateMutation, KakaoAuthenticateMutationVariables>(KakaoAuthenticateDocument, options);
      }
export type KakaoAuthenticateMutationHookResult = ReturnType<typeof useKakaoAuthenticateMutation>;
export type KakaoAuthenticateMutationResult = Apollo.MutationResult<KakaoAuthenticateMutation>;
export type KakaoAuthenticateMutationOptions = Apollo.BaseMutationOptions<KakaoAuthenticateMutation, KakaoAuthenticateMutationVariables>;
export const NaverAuthenticateDocument = gql`
    mutation naverAuthenticate($token: String!) {
  authenticate(input: {naver: {token: $token}}) {
    ... on CurrentUser {
      id
      identifier
    }
  }
}
    `;
export type NaverAuthenticateMutationFn = Apollo.MutationFunction<NaverAuthenticateMutation, NaverAuthenticateMutationVariables>;

/**
 * __useNaverAuthenticateMutation__
 *
 * To run a mutation, you first call `useNaverAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNaverAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [naverAuthenticateMutation, { data, loading, error }] = useNaverAuthenticateMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useNaverAuthenticateMutation(baseOptions?: Apollo.MutationHookOptions<NaverAuthenticateMutation, NaverAuthenticateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NaverAuthenticateMutation, NaverAuthenticateMutationVariables>(NaverAuthenticateDocument, options);
      }
export type NaverAuthenticateMutationHookResult = ReturnType<typeof useNaverAuthenticateMutation>;
export type NaverAuthenticateMutationResult = Apollo.MutationResult<NaverAuthenticateMutation>;
export type NaverAuthenticateMutationOptions = Apollo.BaseMutationOptions<NaverAuthenticateMutation, NaverAuthenticateMutationVariables>;
export const RequestPhoneAuthNumberDocument = gql`
    mutation requestPhoneAuthNumber($number: String!) {
  generatePhoneAuthNumber(phone_number: $number) {
    success
  }
}
    `;
export type RequestPhoneAuthNumberMutationFn = Apollo.MutationFunction<RequestPhoneAuthNumberMutation, RequestPhoneAuthNumberMutationVariables>;

/**
 * __useRequestPhoneAuthNumberMutation__
 *
 * To run a mutation, you first call `useRequestPhoneAuthNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPhoneAuthNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPhoneAuthNumberMutation, { data, loading, error }] = useRequestPhoneAuthNumberMutation({
 *   variables: {
 *      number: // value for 'number'
 *   },
 * });
 */
export function useRequestPhoneAuthNumberMutation(baseOptions?: Apollo.MutationHookOptions<RequestPhoneAuthNumberMutation, RequestPhoneAuthNumberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestPhoneAuthNumberMutation, RequestPhoneAuthNumberMutationVariables>(RequestPhoneAuthNumberDocument, options);
      }
export type RequestPhoneAuthNumberMutationHookResult = ReturnType<typeof useRequestPhoneAuthNumberMutation>;
export type RequestPhoneAuthNumberMutationResult = Apollo.MutationResult<RequestPhoneAuthNumberMutation>;
export type RequestPhoneAuthNumberMutationOptions = Apollo.BaseMutationOptions<RequestPhoneAuthNumberMutation, RequestPhoneAuthNumberMutationVariables>;
export const VerifyPhoneAuthNumberDocument = gql`
    mutation verifyPhoneAuthNumber($number: String!, $code: String!) {
  checkPhoneAuthNumber(phone_number: $number, auth_number: $code) {
    success
  }
}
    `;
export type VerifyPhoneAuthNumberMutationFn = Apollo.MutationFunction<VerifyPhoneAuthNumberMutation, VerifyPhoneAuthNumberMutationVariables>;

/**
 * __useVerifyPhoneAuthNumberMutation__
 *
 * To run a mutation, you first call `useVerifyPhoneAuthNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyPhoneAuthNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyPhoneAuthNumberMutation, { data, loading, error }] = useVerifyPhoneAuthNumberMutation({
 *   variables: {
 *      number: // value for 'number'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useVerifyPhoneAuthNumberMutation(baseOptions?: Apollo.MutationHookOptions<VerifyPhoneAuthNumberMutation, VerifyPhoneAuthNumberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyPhoneAuthNumberMutation, VerifyPhoneAuthNumberMutationVariables>(VerifyPhoneAuthNumberDocument, options);
      }
export type VerifyPhoneAuthNumberMutationHookResult = ReturnType<typeof useVerifyPhoneAuthNumberMutation>;
export type VerifyPhoneAuthNumberMutationResult = Apollo.MutationResult<VerifyPhoneAuthNumberMutation>;
export type VerifyPhoneAuthNumberMutationOptions = Apollo.BaseMutationOptions<VerifyPhoneAuthNumberMutation, VerifyPhoneAuthNumberMutationVariables>;
export const RegisterCustomerDocument = gql`
    mutation registerCustomer($input: MeowtimesRegisterCustomerInput!) {
  meowtimesRegisterCustomerAccount(input: $input) {
    ... on Success {
      success
    }
    ... on CustomerCreateError {
      errorCode
      message
    }
  }
}
    `;
export type RegisterCustomerMutationFn = Apollo.MutationFunction<RegisterCustomerMutation, RegisterCustomerMutationVariables>;

/**
 * __useRegisterCustomerMutation__
 *
 * To run a mutation, you first call `useRegisterCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerCustomerMutation, { data, loading, error }] = useRegisterCustomerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterCustomerMutation(baseOptions?: Apollo.MutationHookOptions<RegisterCustomerMutation, RegisterCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterCustomerMutation, RegisterCustomerMutationVariables>(RegisterCustomerDocument, options);
      }
export type RegisterCustomerMutationHookResult = ReturnType<typeof useRegisterCustomerMutation>;
export type RegisterCustomerMutationResult = Apollo.MutationResult<RegisterCustomerMutation>;
export type RegisterCustomerMutationOptions = Apollo.BaseMutationOptions<RegisterCustomerMutation, RegisterCustomerMutationVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!, $rememberMe: Boolean! = false) {
  login(username: $username, password: $password, rememberMe: $rememberMe) {
    ... on CurrentUser {
      id
      identifier
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      rememberMe: // value for 'rememberMe'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LikeProductDocument = gql`
    mutation likeProduct($productId: ID!, $like: Boolean!) {
  setLikeProduct(productId: $productId, like: $like) {
    success
  }
}
    `;
export type LikeProductMutationFn = Apollo.MutationFunction<LikeProductMutation, LikeProductMutationVariables>;

/**
 * __useLikeProductMutation__
 *
 * To run a mutation, you first call `useLikeProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeProductMutation, { data, loading, error }] = useLikeProductMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *      like: // value for 'like'
 *   },
 * });
 */
export function useLikeProductMutation(baseOptions?: Apollo.MutationHookOptions<LikeProductMutation, LikeProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeProductMutation, LikeProductMutationVariables>(LikeProductDocument, options);
      }
export type LikeProductMutationHookResult = ReturnType<typeof useLikeProductMutation>;
export type LikeProductMutationResult = Apollo.MutationResult<LikeProductMutation>;
export type LikeProductMutationOptions = Apollo.BaseMutationOptions<LikeProductMutation, LikeProductMutationVariables>;
export const AddItemToOrderDocument = gql`
    mutation addItemToOrder($productVariantId: ID!, $quantity: Int!) {
  addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
    ... on Order {
      id
      lines {
        ...CartOrderLine
      }
    }
  }
}
    ${CartOrderLineFragmentDoc}`;
export type AddItemToOrderMutationFn = Apollo.MutationFunction<AddItemToOrderMutation, AddItemToOrderMutationVariables>;

/**
 * __useAddItemToOrderMutation__
 *
 * To run a mutation, you first call `useAddItemToOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemToOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemToOrderMutation, { data, loading, error }] = useAddItemToOrderMutation({
 *   variables: {
 *      productVariantId: // value for 'productVariantId'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useAddItemToOrderMutation(baseOptions?: Apollo.MutationHookOptions<AddItemToOrderMutation, AddItemToOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemToOrderMutation, AddItemToOrderMutationVariables>(AddItemToOrderDocument, options);
      }
export type AddItemToOrderMutationHookResult = ReturnType<typeof useAddItemToOrderMutation>;
export type AddItemToOrderMutationResult = Apollo.MutationResult<AddItemToOrderMutation>;
export type AddItemToOrderMutationOptions = Apollo.BaseMutationOptions<AddItemToOrderMutation, AddItemToOrderMutationVariables>;
export const AddItemsToOrderDocument = gql`
    mutation addItemsToOrder($input: AddItemsToOrderInput!) {
  addItemsToOrder(input: $input) {
    ... on Order {
      id
    }
  }
}
    `;
export type AddItemsToOrderMutationFn = Apollo.MutationFunction<AddItemsToOrderMutation, AddItemsToOrderMutationVariables>;

/**
 * __useAddItemsToOrderMutation__
 *
 * To run a mutation, you first call `useAddItemsToOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemsToOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemsToOrderMutation, { data, loading, error }] = useAddItemsToOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddItemsToOrderMutation(baseOptions?: Apollo.MutationHookOptions<AddItemsToOrderMutation, AddItemsToOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemsToOrderMutation, AddItemsToOrderMutationVariables>(AddItemsToOrderDocument, options);
      }
export type AddItemsToOrderMutationHookResult = ReturnType<typeof useAddItemsToOrderMutation>;
export type AddItemsToOrderMutationResult = Apollo.MutationResult<AddItemsToOrderMutation>;
export type AddItemsToOrderMutationOptions = Apollo.BaseMutationOptions<AddItemsToOrderMutation, AddItemsToOrderMutationVariables>;
export const RemoveOrderLineDocument = gql`
    mutation removeOrderLine($orderLineId: ID!) {
  removeOrderLine(orderLineId: $orderLineId) {
    ... on Order {
      id
      lines {
        ...CartOrderLine
      }
    }
  }
}
    ${CartOrderLineFragmentDoc}`;
export type RemoveOrderLineMutationFn = Apollo.MutationFunction<RemoveOrderLineMutation, RemoveOrderLineMutationVariables>;

/**
 * __useRemoveOrderLineMutation__
 *
 * To run a mutation, you first call `useRemoveOrderLineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveOrderLineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeOrderLineMutation, { data, loading, error }] = useRemoveOrderLineMutation({
 *   variables: {
 *      orderLineId: // value for 'orderLineId'
 *   },
 * });
 */
export function useRemoveOrderLineMutation(baseOptions?: Apollo.MutationHookOptions<RemoveOrderLineMutation, RemoveOrderLineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveOrderLineMutation, RemoveOrderLineMutationVariables>(RemoveOrderLineDocument, options);
      }
export type RemoveOrderLineMutationHookResult = ReturnType<typeof useRemoveOrderLineMutation>;
export type RemoveOrderLineMutationResult = Apollo.MutationResult<RemoveOrderLineMutation>;
export type RemoveOrderLineMutationOptions = Apollo.BaseMutationOptions<RemoveOrderLineMutation, RemoveOrderLineMutationVariables>;
export const RemoveOrderLinesDocument = gql`
    mutation removeOrderLines($orderLineIds: [ID!]!) {
  removeOrderLines(orderLineIds: $orderLineIds) {
    ... on Order {
      id
    }
  }
}
    `;
export type RemoveOrderLinesMutationFn = Apollo.MutationFunction<RemoveOrderLinesMutation, RemoveOrderLinesMutationVariables>;

/**
 * __useRemoveOrderLinesMutation__
 *
 * To run a mutation, you first call `useRemoveOrderLinesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveOrderLinesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeOrderLinesMutation, { data, loading, error }] = useRemoveOrderLinesMutation({
 *   variables: {
 *      orderLineIds: // value for 'orderLineIds'
 *   },
 * });
 */
export function useRemoveOrderLinesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveOrderLinesMutation, RemoveOrderLinesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveOrderLinesMutation, RemoveOrderLinesMutationVariables>(RemoveOrderLinesDocument, options);
      }
export type RemoveOrderLinesMutationHookResult = ReturnType<typeof useRemoveOrderLinesMutation>;
export type RemoveOrderLinesMutationResult = Apollo.MutationResult<RemoveOrderLinesMutation>;
export type RemoveOrderLinesMutationOptions = Apollo.BaseMutationOptions<RemoveOrderLinesMutation, RemoveOrderLinesMutationVariables>;
export const AdjustOrderLineDocument = gql`
    mutation adjustOrderLine($orderLineId: ID!, $quantity: Int!) {
  adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
    ... on Order {
      id
      lines {
        ...CartOrderLine
      }
    }
  }
}
    ${CartOrderLineFragmentDoc}`;
export type AdjustOrderLineMutationFn = Apollo.MutationFunction<AdjustOrderLineMutation, AdjustOrderLineMutationVariables>;

/**
 * __useAdjustOrderLineMutation__
 *
 * To run a mutation, you first call `useAdjustOrderLineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdjustOrderLineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adjustOrderLineMutation, { data, loading, error }] = useAdjustOrderLineMutation({
 *   variables: {
 *      orderLineId: // value for 'orderLineId'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useAdjustOrderLineMutation(baseOptions?: Apollo.MutationHookOptions<AdjustOrderLineMutation, AdjustOrderLineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdjustOrderLineMutation, AdjustOrderLineMutationVariables>(AdjustOrderLineDocument, options);
      }
export type AdjustOrderLineMutationHookResult = ReturnType<typeof useAdjustOrderLineMutation>;
export type AdjustOrderLineMutationResult = Apollo.MutationResult<AdjustOrderLineMutation>;
export type AdjustOrderLineMutationOptions = Apollo.BaseMutationOptions<AdjustOrderLineMutation, AdjustOrderLineMutationVariables>;
export const SetOrderShippingMethodDocument = gql`
    mutation setOrderShippingMethod($id: [ID!]!) {
  setOrderShippingMethod(shippingMethodId: $id) {
    ... on Order {
      id
    }
  }
}
    `;
export type SetOrderShippingMethodMutationFn = Apollo.MutationFunction<SetOrderShippingMethodMutation, SetOrderShippingMethodMutationVariables>;

/**
 * __useSetOrderShippingMethodMutation__
 *
 * To run a mutation, you first call `useSetOrderShippingMethodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetOrderShippingMethodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setOrderShippingMethodMutation, { data, loading, error }] = useSetOrderShippingMethodMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetOrderShippingMethodMutation(baseOptions?: Apollo.MutationHookOptions<SetOrderShippingMethodMutation, SetOrderShippingMethodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetOrderShippingMethodMutation, SetOrderShippingMethodMutationVariables>(SetOrderShippingMethodDocument, options);
      }
export type SetOrderShippingMethodMutationHookResult = ReturnType<typeof useSetOrderShippingMethodMutation>;
export type SetOrderShippingMethodMutationResult = Apollo.MutationResult<SetOrderShippingMethodMutation>;
export type SetOrderShippingMethodMutationOptions = Apollo.BaseMutationOptions<SetOrderShippingMethodMutation, SetOrderShippingMethodMutationVariables>;
export const UseCouponDocument = gql`
    mutation useCoupon($code: String!) {
  useCoupon(code: $code) {
    ... on Success {
      success
    }
    ... on UseCouponError {
      errorCode
      message
    }
  }
}
    `;
export type UseCouponMutationFn = Apollo.MutationFunction<UseCouponMutation, UseCouponMutationVariables>;

/**
 * __useUseCouponMutation__
 *
 * To run a mutation, you first call `useUseCouponMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUseCouponMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [useCouponMutation, { data, loading, error }] = useUseCouponMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useUseCouponMutation(baseOptions?: Apollo.MutationHookOptions<UseCouponMutation, UseCouponMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UseCouponMutation, UseCouponMutationVariables>(UseCouponDocument, options);
      }
export type UseCouponMutationHookResult = ReturnType<typeof useUseCouponMutation>;
export type UseCouponMutationResult = Apollo.MutationResult<UseCouponMutation>;
export type UseCouponMutationOptions = Apollo.BaseMutationOptions<UseCouponMutation, UseCouponMutationVariables>;