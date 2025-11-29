import React from "react";
import "./style.css";
import FileModel from "../FileModel";
import AddPrescriptionCard from "../AddPrescriptionCard";
export default function Files() {
    const [openedCard, setOpenedCard] = React.useState(false);
    const toggleOpenCard = () => {
        setOpenedCard((prev) => !prev);
    };
    React.useEffect(() => {}, []);
    return (
        <div className='files'>
            <FileModel
                content={"empty"}
                type='prescription'
                onClick={toggleOpenCard}
            />
            {/* {documents.data?.map((item: any, index: number) => (
                <FileModel
                    key={index}
                    content={"filled"}
                    type='prescriptions'
                />
            ))} */}

            <AddPrescriptionCard
                display={openedCard}
                onClose={toggleOpenCard}
            />
        </div>
    );
}

// interface FileModelProps {}
