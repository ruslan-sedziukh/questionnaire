import { ScreenType } from '@/types/questionnaire'
import Image from 'next/image'

type Props = {
  showPreviousButton: boolean
  screenType: ScreenType
  onPreviousScreen?: () => void
}

const Header = ({
  showPreviousButton,
  screenType,
  onPreviousScreen,
}: Props) => {
  return (
    <header className="relative flex justify-center w-full max-w-5xl">
      {showPreviousButton && (
        <Image
          className="absolute left-0 cursor-pointer"
          src={
            screenType === ScreenType.Info
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
        src={
          screenType === ScreenType.Info ? '/logo_white.svg' : '/logo_black.svg'
        }
        width={24}
        height={24}
        alt="logo"
      />
    </header>
  )
}

export default Header
