import React, { useState } from "react";
import "./access.pass.styles.scss";
import AccessPass from "../../components/acess-pass/access-pass.component";
import ticketLogoSample from "../../assets/imgs/pass-logo-sample.png";
import ticketBack from "../../assets/imgs/ticket_background.svg";

export interface UserAccessPassProps {
    title: string
    description: string
}

const Ticket = () => {
    return <div className={'pass-ticket'} style={{
        backgroundImage: `url(${ticketBack})`
    }}>
        <div className={'pass-ticket-logo'} style={{
            backgroundImage: `url(${ticketLogoSample})`
        }} />
    </div>
}

export const UserAccessPass = (props: UserAccessPassProps) => {
    const { title, description } = props
    return <div className={'user-pass-container'}>
        <div>
            <Ticket />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className={'user-pass-title'}>{title}</div>
            <div className={'user-pass-details'}>{description}</div>
        </div>
    </div>
}
