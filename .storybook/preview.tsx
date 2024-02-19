import type { Preview } from '@storybook/react'
import { RecoilRoot } from 'recoil'
import '../styles/global.css'
import '../styles/xeicon.min.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MockedProvider } from '@apollo/client/testing'
import { SimpleCollectionsDocument } from '../modules/gql/generated'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    apolloClient: {
      MockedProvider,
      globalMocks: [
        {
          request: {
            query: SimpleCollectionsDocument,
          },
          result: {
            data: {
              "collections": {
                "items": [
                  {
                    "id": "7",
                    "name": "두부",
                    "parentId": "3",
                    "breadcrumbs": [
                      {
                        "id": "1",
                        "name": "__root_collection__"
                      },
                      {
                        "id": "2",
                        "name": "고양이"
                      },
                      {
                        "id": "3",
                        "name": "모래"
                      },
                      {
                        "id": "7",
                        "name": "두부"
                      }
                    ],
                    "children": [],
                    "__typename": "Collection"
                  },
                  {
                    "id": "3",
                    "name": "모래",
                    "parentId": "2",
                    "breadcrumbs": [
                      {
                        "id": "1",
                        "name": "__root_collection__"
                      },
                      {
                        "id": "2",
                        "name": "고양이"
                      },
                      {
                        "id": "3",
                        "name": "모래"
                      }
                    ],
                    "children": [
                      {
                        "id": "7",
                        "name": "두부",
                        "parentId": "3",
                        "breadcrumbs": [
                          {
                            "id": "1",
                            "name": "__root_collection__"
                          },
                          {
                            "id": "2",
                            "name": "고양이"
                          },
                          {
                            "id": "3",
                            "name": "모래"
                          },
                          {
                            "id": "7",
                            "name": "두부"
                          }
                        ],
                        "children": [],
                        "__typename": "Collection"
                      },
                      {
                        "id": "4",
                        "name": "벤토나이트",
                        "parentId": "3",
                        "breadcrumbs": [
                          {
                            "id": "1",
                            "name": "__root_collection__"
                          },
                          {
                            "id": "2",
                            "name": "고양이"
                          },
                          {
                            "id": "3",
                            "name": "모래"
                          },
                          {
                            "id": "4",
                            "name": "벤토나이트"
                          }
                        ],
                        "children": [],
                        "__typename": "Collection"
                      },
                      {
                        "id": "5",
                        "name": "카사바",
                        "parentId": "3",
                        "breadcrumbs": [
                          {
                            "id": "1",
                            "name": "__root_collection__"
                          },
                          {
                            "id": "2",
                            "name": "고양이"
                          },
                          {
                            "id": "3",
                            "name": "모래"
                          },
                          {
                            "id": "5",
                            "name": "카사바"
                          }
                        ],
                        "children": [],
                        "__typename": "Collection"
                      }
                    ],
                    "__typename": "Collection"
                  },
                  {
                    "id": "4",
                    "name": "벤토나이트",
                    "parentId": "3",
                    "breadcrumbs": [
                      {
                        "id": "1",
                        "name": "__root_collection__"
                      },
                      {
                        "id": "2",
                        "name": "고양이"
                      },
                      {
                        "id": "3",
                        "name": "모래"
                      },
                      {
                        "id": "4",
                        "name": "벤토나이트"
                      }
                    ],
                    "children": [],
                    "__typename": "Collection"
                  },
                  {
                    "id": "2",
                    "name": "고양이",
                    "parentId": "1",
                    "breadcrumbs": [
                      {
                        "id": "1",
                        "name": "__root_collection__"
                      },
                      {
                        "id": "2",
                        "name": "고양이"
                      }
                    ],
                    "children": [
                      {
                        "id": "3",
                        "name": "모래",
                        "parentId": "2",
                        "breadcrumbs": [
                          {
                            "id": "1",
                            "name": "__root_collection__"
                          },
                          {
                            "id": "2",
                            "name": "고양이"
                          },
                          {
                            "id": "3",
                            "name": "모래"
                          }
                        ],
                        "children": [
                          {
                            "id": "7",
                            "name": "두부",
                            "parentId": "3",
                            "breadcrumbs": [
                              {
                                "id": "1",
                                "name": "__root_collection__"
                              },
                              {
                                "id": "2",
                                "name": "고양이"
                              },
                              {
                                "id": "3",
                                "name": "모래"
                              },
                              {
                                "id": "7",
                                "name": "두부"
                              }
                            ],
                            "children": [],
                            "__typename": "Collection"
                          },
                          {
                            "id": "4",
                            "name": "벤토나이트",
                            "parentId": "3",
                            "breadcrumbs": [
                              {
                                "id": "1",
                                "name": "__root_collection__"
                              },
                              {
                                "id": "2",
                                "name": "고양이"
                              },
                              {
                                "id": "3",
                                "name": "모래"
                              },
                              {
                                "id": "4",
                                "name": "벤토나이트"
                              }
                            ],
                            "children": [],
                            "__typename": "Collection"
                          },
                          {
                            "id": "5",
                            "name": "카사바",
                            "parentId": "3",
                            "breadcrumbs": [
                              {
                                "id": "1",
                                "name": "__root_collection__"
                              },
                              {
                                "id": "2",
                                "name": "고양이"
                              },
                              {
                                "id": "3",
                                "name": "모래"
                              },
                              {
                                "id": "5",
                                "name": "카사바"
                              }
                            ],
                            "children": [],
                            "__typename": "Collection"
                          }
                        ],
                        "__typename": "Collection"
                      }
                    ],
                    "__typename": "Collection"
                  },
                  {
                    "id": "5",
                    "name": "카사바",
                    "parentId": "3",
                    "breadcrumbs": [
                      {
                        "id": "1",
                        "name": "__root_collection__"
                      },
                      {
                        "id": "2",
                        "name": "고양이"
                      },
                      {
                        "id": "3",
                        "name": "모래"
                      },
                      {
                        "id": "5",
                        "name": "카사바"
                      }
                    ],
                    "children": [],
                    "__typename": "Collection"
                  }
                ]
              }
            }
          }
        }
      ]
    }
  },
  decorators: [
    (Story) => (
      <RecoilRoot>
        <QueryClientProvider client={new QueryClient()}>
          <Story />
        </QueryClientProvider>
      </RecoilRoot>
    ),
  ],
}

export default preview
