import React from "react";
import "./style.css";
import JoditEditor from "jodit-react";
export default function TextEditor(props: any) {
    const { placeHolder, onBlur, onChange, data } = props;
    // const editor = React.useRef<any>(null);
    const [content, setContent] = React.useState<any>("");
    React.useEffect(() => {
        setContent(data);
    }, [data]);
    const config = React.useMemo(() => {
        return {
            readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            placeholder: placeHolder || "Start typing...",
            width: "100%",
            // height: "100%",
            height: "calc(100vh - 230px)",
            // maxHeight: "100%",

            style: {
                width: "100%",
                height: "100%",
            },

            showXPathInStatusbar: false,
            showCharsCounter: false,
            showWordsCounter: false,
            toolbarAdaptive: true,
            toolbarSticky: true,
        };
    }, [placeHolder]);

    return (
        <div
            className='prescription-container'
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "var(--main-gap)",
            }}
        >
            <div
                style={{
                    height: "100%",
                    width: "100%",
                }}
            >
                <JoditEditor
                    // ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1} // tabIndex of textarea
                    onBlur={(newContent: any) => {
                        setContent(newContent),
                        onBlur && onBlur(newContent);
                    }} // preferred to use only this option to update the content for performance reasons
                    onChange={(newContent: any) => {
                        onChange && onChange(newContent);
                    }}
                />
            </div>
            {/* <div
                style={{
                    height: "60px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <button
                    style={{
                        backgroundColor: "var(--color-1)",
                        padding: "0 20px",
                        color: "white",
                        borderRadius: "var(--main-rd)",
                        height: "100%",
                    }}
                >
                    Enregistrer
                </button>
            </div> */}
        </div>
    );
}
