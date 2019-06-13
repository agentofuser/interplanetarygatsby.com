import React from 'react'

function DateText({
  date,
  lastUpdated,
}: {
  date: string
  lastUpdated: string
}) {
  return (
    <>
      {date}
      {lastUpdated ? <em>{` · Last updated: ${lastUpdated}`}</em> : null}
    </>
  )
}

export default DateText
