import "./ResponseBox.css";
import React from "react";

const ResponseBox = (props: {loading: boolean; response: string | null}) => {

    return(
        <div>
            <h1 className="response-box-header">WatchGenies response:</h1>
            <div className="response-box">
                {props.loading && <p>I am thinking....</p>}
                {props.response !== null && <p>{props.response}</p>}
            </div>
        </div>
    )

}

export default ResponseBox;