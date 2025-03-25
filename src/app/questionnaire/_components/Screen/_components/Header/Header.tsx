import { ScreenType } from '@/types/questionnaire'
import Image from 'next/image'

type Props = {
  showPreviousButton: boolean
  onPreviousScreen?: () => void
  iconsVariant: 'white' | 'black'
}

const Header = ({
  showPreviousButton,
  onPreviousScreen,
  iconsVariant,
}: Props) => {
  return (
    <header className="relative flex justify-center w-full max-w-5xl">
      {showPreviousButton && (
        <Image
          className="absolute left-0 cursor-pointer"
          src={
            iconsVariant === 'white'
              ? '/chevron_white.svg'
              : '/chevron_black.svg'
          }
          width={24}
          height={24}
          alt="chevron"
          onClick={onPreviousScreen}
        />
      )}

      <Image
        src={iconsVariant === 'white' ? '/logo_white.svg' : '/logo_black.svg'}
        width={24}
        height={24}
        alt="logo"
      />
    </header>
  )
}

export default Header
