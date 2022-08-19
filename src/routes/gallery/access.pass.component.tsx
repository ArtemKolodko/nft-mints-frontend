import React, { useState } from "react";
import "./access.pass.styles.scss";
import ticketBack from "../../assets/imgs/ticket_background.svg";
import {CollectionType} from "../../types";

export interface UserAccessPassProps {
    data: CollectionType
    onClick: () => void
}

const Ticket = (props: { data: CollectionType }) => {
    return <div className={'pass-ticket'} style={{
        backgroundImage: `url(${ticketBack})`
    }}>
        <div className={'pass-ticket-logo'} style={{
            backgroundImage: `url(${props.data.collectionImage})`
        }} />
    </div>
}

export const UserAccessPass = (props: UserAccessPassProps) => {
    const { data, onClick } = props
    const { title, description } = data

    return <div className={'user-pass-container'} onClick={onClick}>
        <div>
            <Ticket data={data} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            <div className={'user-pass-title'}>{title}</div>
            <div className={'user-pass-details'}>{description}</div>
        </div>
    </div>
}
