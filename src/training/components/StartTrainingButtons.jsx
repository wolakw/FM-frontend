import {Link} from "react-router-dom";
import React from "react";

export function StartTrainingButtons() {

    return (
        <div>

                    <Link to={"/Individual-training"}>
                        <button className="btn btn-primary mx-2">Individual Training</button>
                    </Link>
                    <Link to={"/Team-training"}>
                        <button className="btn btn-primary mx-2">Team Training</button>
                    </Link>
        </div>
    )

}

export default StartTrainingButtons;