import React, { useState } from 'react';

export const Bot = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="self-end m-3">
            {isVisible && (
                <div>
                    <div className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                            </div>
                        </div>
                        <div className="chat-bubble">It was said that you would, destroy the Sith, not join them.</div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                            </div>
                        </div>
                        <div className="chat-bubble">It was you who would bring balance to the Force</div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS chat bubble component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                            </div>
                        </div>
                        <div className="chat-bubble">Not leave it in Darkness</div>
                    </div>
                </div>
            )}
            <svg width="24" height="24" onClick={toggleVisibility} viewBox="0 0 54 54" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M9.03825 40.1423C9.38856 40.4939 9.657 40.9185 9.82443 41.3858C9.99185 41.8531 10.0542 42.3515 10.0069 42.8456C9.7691 45.1324 9.31941 47.3921 8.66362 49.5956C13.3717 48.5055 16.2473 47.2433 17.5534 46.5818C18.2942 46.2065 19.1473 46.1176 19.9496 46.332C22.249 46.9474 24.6197 47.2561 27 47.25C40.4865 47.25 50.625 37.7764 50.625 27C50.625 16.2236 40.4865 6.75 27 6.75C13.5135 6.75 3.375 16.227 3.375 27C3.375 31.9545 5.45737 36.5513 9.03825 40.1423ZM7.37437 53.3216C6.57469 53.4799 5.77246 53.6251 4.968 53.757C4.293 53.865 3.78 53.163 4.04663 52.5352C4.34549 51.8282 4.62015 51.1112 4.87012 50.3854L4.88025 50.3516C5.71725 47.9216 6.399 45.1271 6.64875 42.525C2.50763 38.3738 0 32.94 0 27C0 13.9523 12.0892 3.375 27 3.375C41.9108 3.375 54 13.9523 54 27C54 40.0477 41.9108 50.625 27 50.625C24.3257 50.631 21.6623 50.2837 19.0789 49.5923C17.3239 50.4799 13.5472 52.0965 7.37437 53.3216Z"
                    fill="black"/>
            </svg>
        </div>
    );
};
