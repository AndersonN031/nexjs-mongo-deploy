
import DashboardComponent from "../components/dashboard/DashboardComponent"
import React from "react"
import LayoutAdmin from "../components/LayoutAdminComponente";

export const dynamic = 'force-dynamic';

export default function DashBoard() {

    return (
        <>
            <LayoutAdmin>

                <DashboardComponent />
            </LayoutAdmin>
        </>
    )
}