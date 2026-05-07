import satori from "satori";
import { SITE } from "@/config";
import loadGoogleFonts from "../loadGoogleFont";

export default async () => {
  return satori(
    {
      type: "div",
      props: {
        style: {
          background: "#f5efe4",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "52px",
                right: "54px",
                border: "2px solid #d9cbbb",
                background: "#efe7da",
                opacity: "0.9",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                width: "86%",
                height: "76%",
              },
            },
          },
          {
            type: "div",
            props: {
              style: {
                border: "2px solid #d9cbbb",
                background: "#fcfbf7",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                width: "86%",
                height: "76%",
              },
              children: {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    margin: "20px",
                    width: "90%",
                    height: "90%",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "90%",
                          maxHeight: "90%",
                          overflow: "hidden",
                          textAlign: "center",
                        },
                        children: [
                          {
                            type: "p",
                            props: {
                              style: {
                                fontFamily: "Canela Deck, Georgia",
                                fontSize: 92,
                                fontWeight: 400,
                                lineHeight: 1,
                                color: "#35312b",
                              },
                              children: SITE.title,
                            },
                          },
                          {
                            type: "p",
                            props: {
                              style: {
                                fontFamily: "Canela Text, Georgia",
                                fontSize: 34,
                                fontWeight: 300,
                                color: "#756f66",
                              },
                              children: SITE.desc,
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex",
                          justifyContent: "flex-end",
                          width: "100%",
                          marginBottom: "8px",
                          fontFamily: "Canela Text, Georgia",
                          fontSize: 28,
                          color: "#8b1e52",
                        },
                        children: {
                          type: "span",
                          props: {
                            style: { overflow: "hidden", fontWeight: 500 },
                            children: new URL(SITE.website).hostname,
                          },
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      embedFont: true,
      fonts: await loadGoogleFonts(SITE.title + SITE.desc + SITE.website),
    }
  );
};
