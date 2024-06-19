export enum SlideType {
    FORWARD = 'FORWARD',
    BACK = 'BACK',
    PAGE = "PAGE"
}

export interface SlideActionForward {
    type: SlideType.FORWARD;
}

export interface SlideActionBack {
    type: SlideType.BACK;
}

export interface SlideActionPage {
    type: SlideType.PAGE;
    payload: number;
}

export type SlideAction = SlideActionForward | SlideActionBack | SlideActionPage;