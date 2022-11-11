import React, { useState } from 'react'
import * as S from './style'

interface IProps {
  placeholder: string
  value: string
  onChange: (e: string) => void
  label?: string
  type: 'password' | 'text'
}

export default function InputText({
  placeholder,
  value,
  onChange,
  label,
  type
}: IProps) {
  const [acctivated, setAcctivated] = useState(false)
  return (
    <S.InputContainer>
      {label && <S.Label>{label}</S.Label>}
      <S.Input
        value={value}
        type={
          type === 'password'
            ? acctivated === true
              ? 'text'
              : 'password'
            : type
        }
        onChange={({ target }) => onChange(target.value)}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <S.Icon
          onClick={() => setAcctivated(!acctivated)}
          src={acctivated === false ? 'icons/eye.svg' : 'icons/eye-off.svg'}
          alt="Icone de olhos"
        />
      )}
    </S.InputContainer>
  )
}
