import React from "react";
import "./style.css";
export default function CostAndPayment(props: any) {
    const { isManuelSum, billInfo, onBillChange, isEditing } = props;
    let { costsArray } = props;
    let [sumCost, costsString] = React.useMemo(() => {
        let sum: number = 0;
        let str: string = "";
        costsArray = costsArray.filter((item: number) => item !== 0);
        costsArray.map((item: number, index: number) => {
            sum += Number(item.toFixed(0));
            if (index > 0) {
                if (index === 1) str += `${costsArray[0].toFixed(0)}`;
                str += ` + ${item.toFixed(0)}`;
            }
        });
        if (costsArray.length > 1) str += ` = ${sum} `;
        return [sum, str];
    }, [costsArray]);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--main-gap)",
            }}
        >
            {isManuelSum ? (
                <>
                    <div className="input">
                        <label htmlFor="cost">
                            Doit (TND)
                            <Star />
                        </label>
                        {isEditing ? (
                            <input
                                type="number"
                                id="cost"
                                name="cost"
                                value={billInfo.cost}
                                onChange={onBillChange}
                            />
                        ) : (
                            <div
                                className="center"
                                style={{
                                    height: "40px",
                                    width: "100%",
                                    fontSize: "large",
                                    color: "var(--color-1)",
                                    fontWeight: "bold",
                                    backgroundColor: "white",
                                    borderRadius: "var(--main-rd)",
                                }}
                            >
                                {billInfo.cost}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="input">
                    <label htmlFor="cost">Doit ({costsString}DT)</label>
                    <div
                        className="center"
                        style={{
                            height: "40px",
                            width: "100%",
                            fontSize: "large",
                            color: "var(--color-1)",
                            fontWeight: "bold",
                            backgroundColor: "white",
                            borderRadius: "var(--main-rd)",
                        }}
                    >
                        {/* {billInfo.cost} */}
                        {sumCost.toFixed(0)}
                    </div>
                </div>
            )}
            {/* </div>
                <div className="input">
                    <label htmlFor="cost">Doit (DT)</label>
                    <input
                        type="number"
                        id="cost"
                        name="cost"
                        value={billInfo.cost}
                        onChange={onBillChange}
                    />
                </div> */}

            <div className="input" style={{}}>
                <label htmlFor="payed">Reçu (DT)</label>

                {isEditing ? (
                    <input
                        type="number"
                        id="payed"
                        name="payed"
                        value={billInfo.payed}
                        onChange={onBillChange}
                    />
                ) : (
                    <div
                        className="center"
                        style={{
                            height: "40px",
                            width: "100%",
                            fontSize: "large",
                            color: "var(--color-1)",
                            fontWeight: "bold",
                            backgroundColor: "white",
                            borderRadius: "var(--main-rd)",
                        }}
                    >
                        {billInfo.payed || 0}
                    </div>
                )}
            </div>
        </div>
    );
}
const Star = () => {
    return (
        <span
            style={{
                color: "red",
                fontWeight: "bold",
                fontSize: "medium",
                padding: "0 2px",
            }}
        >
            *
        </span>
    );
};
