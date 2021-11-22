// We can move this to constant file/ fetch from db using api

const filterRouts = [];
const paramRouts = [];

export const FILTER_PARAM = 'param';

export const FILTER = 'filter';

export const filters = [
  {
    id: 1,
    link: 'top_gainers',
    name: 'Top gainers',
    tag: 'Intraday Bullish',
    criteria: [
      {
        type: 'plain_text',
        text: 'Sort - %price change in descending order',
      },
    ],
  },
  {
    id: 2,
    link: 'intraday_buying',
    name: 'Intraday buying seen in last 15 minutes',
    tag: 'Bullish',
    criteria: [
      {
        type: 'plain_text',
        text: 'Current candle open = current candle high',
      },
      {
        type: 'plain_text',
        text: 'Previous candle open = previous candle high',
      },
      {
        type: 'plain_text',
        text: '2 previous candle’s open = 2 previous candle’s high',
      },
    ],
  },
  {
    id: 3,
    link: 'open_high',
    name: 'Open = High',
    tag: 'Bullish',
    criteria: [
      {
        type: 'variable',
        text: 'Today’s open \u003c yesterday’s low by $1 %',
        variable: {
          $1: {
            type: 'value',
            values: [-3, -1, -2, -5, -10],
            link: 'open_high_params',
          },
        },
      },
    ],
  },
  {
    id: 4,
    link: 'cci_reversal',
    name: 'CCI Reversal',
    tag: 'Bearish',
    color: 'red',
    criteria: [
      {
        type: 'variable',
        text: 'CCI $1 crosses below $2',
        variable: {
          $1: {
            type: 'indicator',
            study_type: 'cci',
            parameter_name: 'period',
            min_value: 1,
            max_value: 99,
            default_value: 20,
            link: 'cci_period_params',
          },
          $2: { type: 'value', values: [100, 200], link: 'cci_array_params' },
        },
      },
    ],
  },
  {
    id: 5,
    link: 'rsi_overbought',
    name: 'RSI Overbought',
    tag: 'Bearish',
    color: 'red',
    criteria: [
      {
        type: 'variable',
        text: 'Max of last 5 days close \u003e Max of last 120 days close by $1 %',
        variable: {
          $1: { type: 'value', values: [2, 1, 3, 5], link: 'rsi_params_one' },
        },
      },
      {
        type: 'variable',
        text: "Today's Volume \u003e prev $2 Vol SMA by $3 x",
        variable: {
          $2: {
            type: 'value',
            values: [10, 5, 20, 30],
            link: 'rsi_params_two',
          },
          $3: {
            type: 'value',
            values: [1.5, 0.5, 1, 2, 3],
            link: 'rsi_params_three',
          },
        },
      },
      {
        type: 'variable',
        text: 'RSI $4 \u003e 20',
        variable: {
          $4: {
            type: 'indicator',
            study_type: 'rsi',
            parameter_name: 'period',
            min_value: 1,
            max_value: 99,
            default_value: 14,
            link: 'rsi_period_params',
          },
        },
      },
    ],
  },
];

export const createRouteArrays = () => {
  for (const filter of filters) {
    filterRouts.push(filter.link);
    for (const criteria of filter.criteria) {
      if (criteria.type === 'variable') {
        for (const variable in criteria.variable) {
          paramRouts.push(criteria.variable[variable].link);
        }
      }
    }
  }
};

export const isFilterRoute = (route) => {
  return filterRouts.indexOf(route) > -1;
};

export const isParamRoute = (route) => {
  return paramRouts.indexOf(route) > -1;
};

export const PARAM_TYPES = {
  plain_text: 'plain_text',
  variable: 'variable',
};

export const VARIABLE_TYPES = {
  value: 'value',
  indicator: 'indicator',
};
