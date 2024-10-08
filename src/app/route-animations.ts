import {animate, group, keyframes, query, style, transition, trigger,} from '@angular/animations';


// Basic

export const slide =
    trigger('routeAnimations', [
        transition(`home => news, home => contact, home => about,home => schedule, home => gallery, news => contact,news => about, news => schedule, news => gallery, contact => about, contact => schedule, contact => gallery, about => schedule, about => gallery, schedule => gallery`, [
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    opacity: 0,
                    transform: 'translateX(100%)',
                }),
            ]),
            query(':enter', [
                animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateX(0)' })),
            ])
        ]),

        transition(`gallery => schedule, gallery => about, gallery => contact, gallery => news, landscape => gallery, landscape => schedule, landscape => about, landscape => contact, landscape => news, schedule => about, schedule => contact, schedule => news, about => contact, about => news, contact => news`, [
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    opacity: 0,
                    transform: 'translateX(-100%)',
                }),
            ]),
            query(':enter', [
                animate('600ms ease', style({ opacity: 1, transform: 'scale(1) translateX(0)' })),
            ])
        ]),

    ]);


// Positioned

export const slider =
    trigger('routeAnimations', [
        transition('* => isLeft', slideTo('left')),
        transition('* => isRight', slideTo('right')),
        transition('isRight => *', slideTo('left')),
        transition('isLeft => *', slideTo('right'))
    ]);


export const transformer =
    trigger('routeAnimations', [
        transition('* => isLeft', translateTo({ x: -100, y: -100, rotate: -720 })),
        transition('* => isRight', translateTo({ x: 100, y: -100, rotate: 90 })),
        transition('isRight => *', translateTo({ x: -100, y: -100, rotate: 360 })),
        transition('isLeft => *', translateTo({ x: 100, y: -100, rotate: -360 }))
    ]);




function slideTo(direction) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                [direction]: 0,
                width: '100%'
            })
        ], optional),
        query(':enter', [
            style({ [direction]: '-100%' })
        ]),
        group([
            query(':leave', [
                animate('600ms ease', style({ [direction]: '100%' }))
            ], optional),
            query(':enter', [
                animate('600ms ease', style({ [direction]: '0%' }))
            ])
        ]),
        // Normalize the page style... Might not be necessary

        // Required only if you have child animations on the page
        // query(':leave', animateChild()),
        // query(':enter', animateChild()),
    ];
}


function translateTo({ x = 100, y = 0, rotate = 0 }) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%'
            })
        ], optional),
        query(':enter', [
            style({ transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)` })
        ]),
        group([
            query(':leave', [
                animate('600ms ease-out', style({ transform: `translate(${x}%, ${y}%) rotate(${rotate}deg)` }))
            ], optional),
            query(':enter', [
                animate('600ms ease-out', style({ transform: `translate(0, 0) rotate(0)` }))
            ])
        ]),
    ];
}


// Keyframes

export const stepper =
    trigger('routeAnimations', [
        transition('* <=> *', [
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                }),
            ]),
            group([
                query(':enter', [
                    animate('2000ms ease', keyframes([
                        style({ transform: 'scale(0) translateX(100%)', offset: 0 }),
                        style({ transform: 'scale(0.5) translateX(25%)', offset: 0.3 }),
                        style({ transform: 'scale(1) translateX(0%)', offset: 1 }),
                    ])),
                ]),
                query(':leave', [
                    animate('2000ms ease', keyframes([
                        style({ transform: 'scale(1)', offset: 0 }),
                        style({ transform: 'scale(0.5) translateX(-25%) rotate(0)', offset: 0.35 }),
                        style({ opacity: 0, transform: 'translateX(-50%) rotate(-180deg) scale(6)', offset: 1 }),
                    ])),
                ])
            ]),
        ])

    ]);

export const slidePhoto = trigger('slidePhoto', [
    transition('void => *', [
        style({
            opacity: 0,
            transform: 'translateY(100%)'
        }),
        animate('.3s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
    ])
])
