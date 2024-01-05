import React, { useEffect, useState } from "react";


const Fortable = () => {
    const [plan, setPlan] = useState("business");

    // const [planToCompare, setPlanToCompare] = useState("pro");

    const handleChange = (e) => {
        e.preventDefault();
        setPlan(e.target.value);
    };

    // const handleChange2 = (e) => {
    //     e.preventDefault();
    //     setPlanToCompare(e.target.value);
    // };

    const data = [
        {
            business: ["Lorem", "Ipsum", "Dolor sit amet"],
            pro: ["Lorem 1", "Ipsum 2", "Dolor sit amet 3"],
            free: ["Lorem 4", "Ipsum 5", "Dolor sit amet 6"]
        }
    ];

    const renderData = (plan1, plan2) => {
        const arr = data[0][plan1];
        const arr2 = data[0][plan2];

        return arr.map((item, index) => (
            <tr key={`plan_${index + 1}`}>
                <td>{item}</td>
                <td>{arr2[index]}</td>
            </tr>
        ));
    };

    return (
        <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>
                            <select datachosen={plan} onChange={(e) => handleChange(e)}>
                                <option value={"business"}>Business</option>
                                <option value={"pro"}>Pro</option>
                                <option value={"free"}>Free</option>
                            </select>
                        </th>
                        <th>
                            <select
                                id={"select2"}
                                datachosen={planToCompare}
                                onChange={(e) => handleChange2(e)}
                            >
                                <option value={"pro"}>Pro</option>
                                <option value={"free"}>Free</option>
                                <option value={"business"}>Business</option>
                            </select>
                        </th>
                    </tr>
                </thead>
                <tbody>{renderData(plan, planToCompare)}</tbody>
            </table>
        </div>
    );
};

export default Fortable;