import {
  forwardRef,
  type MouseEventHandler,
  type ForwardRefExoticComponent,
  type Ref,
} from "react";

export const PropsPackage: ForwardRefExoticComponent<{
  children: JSX.Element | JSX.Element[];
  onClick: MouseEventHandler;
  ref?: Ref<any>;
}> = forwardRef(({ children, onClick }, ref) => {
  return (
    <div
      className="inline-flex justify-start items-center cursor-pointer"
      onClick={onClick}
      ref={ref}
    >
      {children}
    </div>
  );
});

// export const PropsPackage = styled.div`
//   display: inline-flex;
//   justify-content: center;
//   align-items: center;
//   padding: 16rem;
//   height: 77rem;
//   font-size: 16px;
//   background: #ef9535;
//   border: 2px solid #491b03;
//   color: #fff3e3;
//   font-weight: bolder;
//   border-radius: 16rem;
//   box-shadow: inset 0 -4px #dd772f;
//   cursor: pointer;
//   box-sizing: border-box;
// `;
