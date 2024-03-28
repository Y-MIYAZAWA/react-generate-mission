import React, { forwardRef } from "react";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputImage = forwardRef<HTMLInputElement, Props>(
  ({onChange}, ref) => {
    return(
      <>
      <input
      ref={ref}
      id="image"
      type="file"
      accept="image/*"
      onChange={onChange} />
      </>
    )
  }
)