import React, { useEffect, useState } from 'react'
import clsx from 'clsx'

type TimerProps = {
  initialTime: number
  type?: string
  className?: string
  action?: () => void
} & React.HTMLAttributes<HTMLDivElement>

const Timer = ({ initialTime, type, className, action }: TimerProps) => {
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    // 컴포넌트가 언마운트되면 clearInterval을 호출하여 메모리 누수를 방지합니다.
    return () => clearInterval(intervalId)
  }, []) // 빈 배열을 전달하여 마운트될 때 한 번만 실행되도록 합니다.

  if (time === 0) {
    action && action()
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    const formattedMinutes = String(minutes).padStart(2, '')
    const formattedSeconds = String(remainingSeconds).padStart(2, '0')

    return `${formattedMinutes}:${formattedSeconds}`
  }

  return (
    <div
      className={clsx(
        {
          'absolute right-[18px] top-[17px] z-10 text-red-04': type === 'registerTimer',
        },
        className,
      )}
    >
      {time > 0 ? (
        <div>
          <p>{formatTime(time)}</p>
        </div>
      ) : (
        <p>0:00</p>
      )}
    </div>
  )
}

export default Timer
