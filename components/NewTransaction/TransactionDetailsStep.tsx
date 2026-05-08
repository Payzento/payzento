import React from 'react'


type TransactionProps = {
  onNext: () => void
}

const TransactionDetailsStep = ({onNext}: TransactionProps) => {
  return (
    <div className='flex flex-col'>
      TransactionDetailsStep

      <button onClick={onNext}>Continue</button>
    </div>
  )
}

export default TransactionDetailsStep
