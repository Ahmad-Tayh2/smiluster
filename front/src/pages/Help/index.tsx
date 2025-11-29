import React from "react";

export default function Help() {
    return (
        <div className="stock-list-page">
            <div className="page-title">Aide et support</div>
            <div className="stock-list main-box">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        // justifyContent: "center",
                        backgroundColor: "var(--color-4)",
                        gap: "var(--main-gap",
                        padding: "var(--pd-1)",
                        borderRadius: "var(--main-rd)",
                        marginBottom: "10px",
                    }}
                >
                    <h2
                        style={{
                            fontSize: "large",
                        }}
                    >
                        Guide d'utilisation de l'application
                    </h2>
                    <p>
                        Afin de vous aider à utiliser notre application
                        correctement, nous avons inclus un didacticiel vidéo
                        ci-dessous.
                    </p>
                </div>
                {/* <p>
                    Le support technique sera bientôt disponible sur cette page
                    pour répondre à vos questions.
                </p> */}
                <div
                    className="video-container center"
                    style={{
                        backgroundColor: "var(--color-4)",
                        width: "fit-content",
                        padding: "10px",
                        borderRadius: "var(--main-rd)",
                        // marginLeft: "auto",
                        // marginRight: "auto",
                    }}
                >
                    <iframe
                        width="840"
                        height="472.5"
                        src="https://www.youtube.com/embed/oM4gKV_Z5CI"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <video
                    width="560"
                    height="315"
                    src="https://www.youtube.com/watch?v=oM4gKV_Z5CI&ab_channel=smiluster"
                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></video>
            </div>
        </div>
    );
}
