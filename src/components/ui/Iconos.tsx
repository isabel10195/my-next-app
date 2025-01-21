"use client"

import { FC, SVGProps } from "react";
import { FaTelegramPlane, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
import { FiPlay, FiEye, FiClock, FiUser, FiPause, FiSkipBack, FiSkipForward } from "react-icons/fi";

export const Iconos = {
  telegram: (props: SVGProps<SVGSVGElement>) => <FaTelegramPlane {...props} />,
  youtube: (props: SVGProps<SVGSVGElement>) => <FaYoutube {...props} />,
  facebook: (props: SVGProps<SVGSVGElement>) => <FaFacebook {...props} />,
  twitter: (props: SVGProps<SVGSVGElement>) => <FaTwitter {...props} />,
  play: (props: SVGProps<SVGSVGElement>) => <FiPlay {...props} />,
  views: (props: SVGProps<SVGSVGElement>) => <FiEye {...props} />,
  clock: (props: SVGProps<SVGSVGElement>) => <FiClock {...props} />,
  avatar: (props: SVGProps<SVGSVGElement>) => <FiUser {...props} />,
  pause: (props: SVGProps<SVGSVGElement>) => <FiPause {...props} />,
  previous: (props: SVGProps<SVGSVGElement>) => <FiSkipBack {...props} />,
  next: (props: SVGProps<SVGSVGElement>) => <FiSkipForward {...props} />
}
