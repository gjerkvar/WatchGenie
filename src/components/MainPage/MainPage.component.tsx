import React, { useState } from "react";
import Header from "../Header/Header.component";
import ResponseBox from "../ResponseBox/ResponseBox.component";
import SearchBar from "../SearchBar/SearchBar.component";
import "./MainPage.css"

const MainPage = () => {    

    const [response, setResponse] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    return(
        <div className="main-page-container">
            <Header/>
            <SearchBar onSearch={setResponse} loading={loading} setLoading={setLoading} response={response}/>
            <ResponseBox loading={loading} response={response}/>

        </div>
    )

}

export default MainPage;