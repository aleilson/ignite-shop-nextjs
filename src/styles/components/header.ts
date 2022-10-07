import { styled } from "..";

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',


  'button': {
    background: '$gray800',
    color: '$gray500',
    borderRadius: 6,
    padding: 12,
    border: 'none',
    cursor: 'pointer',
    position: 'relative',

    '&:hover' : {
      opacity: '0.7'
    },

    '& > span': {
      position: 'absolute',
      right: -10,
      top: -6,
      background: '$green500',
      color: '$white',
      height: '24px',
      width: '24px',
      borderRadius: '50%',
      border: '1px solid $gray900',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'

    }
  }
});