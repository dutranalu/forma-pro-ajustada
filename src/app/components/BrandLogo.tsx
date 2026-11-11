import logo from '../assets/logo-formapro-cropped.png';

interface BrandLogoProps {
  variant?: 'header' | 'auth' | 'footer';
  className?: string;
}

const variantStyles: Record<NonNullable<BrandLogoProps['variant']>, string> = {
  header: 'h-10 w-auto max-w-[168px]',
  auth: 'h-20 w-auto max-w-[300px]',
  footer: 'h-12 w-auto max-w-[190px]',
};

export function BrandLogo({ variant = 'header', className = '' }: BrandLogoProps) {
  return (
    <img
      src={logo}
      alt="FormaPro"
      className={`${variantStyles[variant]} object-contain ${className}`.trim()}
    />
  );
}
