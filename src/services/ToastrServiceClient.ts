import React from 'react'
import toast, { ToastPosition } from 'react-hot-toast';
import { ToastrMessageEnum } from '../enums/toastrMessagEnum/ToastrMessageEnum';


interface IToastr{
  content:ToastrMessageEnum | string
  position?:ToastPosition
  minWidth?:string
  duration?:number
  
}


export const successToastr = (props:Partial<IToastr>)=>{

  return toast.success(props.content as string, {
    duration: 2000,
    position: props.position ? props.position : 'bottom-right',
    style:{
      minWidth: props.minWidth ? props.minWidth : '400px'
    },
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });

}

export const errorToastr = (props:Partial<IToastr>)=>{

  return toast.error(props.content as string, {
    duration: props.duration? props.duration:2000,
    position: props.position ? props.position : 'bottom-right',
    style:{
      minWidth: props.minWidth ? props.minWidth : '400px'
    },
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });

}

export const infoToastr = (props:Partial<IToastr>)=>{

  return toast(props.content as string, {
    duration: 2000,
    position: props.position ? props.position : 'bottom-right',
    style:{
      minWidth: props.minWidth ? props.minWidth : '400px'
    },
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });

}

