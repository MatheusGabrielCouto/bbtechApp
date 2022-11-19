import React from 'react'
import * as S from './style'
import Lottie from 'react-lottie'
import animationData from 'assets/animation/loading.json'

interface IProps {
  disabled: boolean
  label: string
  onPress: () => void
  loading: boolean
  style?: object
}

export default function Button({
  disabled,
  label,
  onPress,
  loading,
  style
}: IProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <S.ButtonContainer>
      <S.Button
        style={{ ...style }}
        onClick={onPress}
        disabled={disabled || loading}
      >
        {loading === true ? (
          <Lottie options={defaultOptions} width="40px" height="40px" />
        ) : (
          label
        )}
      </S.Button>
    </S.ButtonContainer>
  )
}
