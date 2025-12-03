import Image from 'next/image';

import LogoSvg from '@/assets/logo/codesampa-io.svg';

interface LogoProps {
  width?: number;
}

export const Logo = ({ width = 32 }: LogoProps) => {
  return <Image src={LogoSvg} alt="logo" width={width} height={width} />;
};
