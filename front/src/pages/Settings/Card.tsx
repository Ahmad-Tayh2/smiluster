import React from "react";
import "./style.css";

export default function SettingCard(props: SettingCardProps) {
    const { title, description, sideOption, bottomOption } = props;
    return (
        <div className='setting-card-container'>
            <div className='setting-card'>
                <div className='setting-card-header'>
                    <div className='setting-card-title'>{title}</div>
                    <div className='setting-card-description'>
                        {description}
                    </div>
                </div>
                {sideOption && (
                    <div className='setting-card-side-option'>{sideOption}</div>
                )}
            </div>
            {bottomOption && (
                <div className='setting-card-bottom-option'>{bottomOption}</div>
            )}
        </div>
    );
}

interface SettingCardProps {
    title?: string;
    description?: string;
    sideOption?: React.ReactNode;
    bottomOption?: React.ReactNode;
}
SettingCard.defaultProps = {};
