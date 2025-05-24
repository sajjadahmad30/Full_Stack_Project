import React from 'react'
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js"

const PaypalButton = ({amount, onSuccess, onError}) => {
  return <PayPalScriptProvider options={{"client-id": "AfFOmMZVqfWUuGoRgyujHPoYCgnw1D410XAtIGYA2EsWO92jrt-YHNrphu23iXjFp47ikSwzV29-19E"
}}>
    <PayPalButtons style={{layout:"vertical"}}
    createOrder={(data, actions)=>{
        return actions.order.create({
            purchase_units: [{amount: {value: amount}}]
        })
    }}
    onApprove={(data, actions)=>{
       return actions.order.capture().then(onSuccess)
    }}
    onError={onError}/>
  </PayPalScriptProvider>
}

export default PaypalButton
