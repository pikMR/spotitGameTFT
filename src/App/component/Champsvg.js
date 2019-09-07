import React, { Component }  from 'react';

export const GetImageChamp = props => {

          switch(props){
            case 1: 
                return (<svg id="trait-Assassin" viewBox="0 0 31 32"><title>trait-Assassin</title><path d="M15.515 4.848c-2.198 0-5.672 1.446-6.206 7.111-0.353 3.743-1.939 5.24-3.491 5.988 0.517 2.246 2.638 7.036 6.982 8.234-2.198-4.366-4.732-13.099 2.715-13.099v-8.234zM15.515 4.848c2.198 0 5.672 1.446 6.206 7.111 0.388 4.117 1.939 5.24 3.491 5.988-0.517 2.246-2.638 7.036-6.982 8.234 2.198-4.366 4.732-13.099-2.715-13.099v-8.234z"></path><path d="M17.423 20.818c-0.971 1.23-2.893 1.278-3.863 0.047-0.845-1.071-1.319-2.205-1.57-3.788-0.146-0.92 0.446-1.781 1.341-2.098 1.411-0.5 2.967-0.497 4.379 0.004 0.888 0.315 1.494 1.166 1.351 2.079-0.225 1.444-0.699 2.567-1.638 3.756z"></path></svg>);
            case 2:
              return  (<svg id="trait-Blademaster" viewBox="0 0 32 32"><title>trait-Blademaster</title><path d="M16 2l-2.823 3.111v13.333h5.647v-13.333l-2.823-3.111z"></path><path d="M9.882 19.778l-1.882 3.556h0.941l1.412-1.333h11.294l1.412 1.333h0.941l-1.412-3.556h-12.706z"></path><path d="M14.588 22h2.824v4.444h-2.824v-4.444z"></path><path d="M18.353 27.778c0 1.227-1.053 2.222-2.353 2.222s-2.353-0.995-2.353-2.222c0-1.227 1.053-2.222 2.353-2.222s2.353 0.995 2.353 2.222z"></path></svg>);
            case 3:
              return (<svg id="trait-Brawler" viewBox="0 0 32 32"><title>trait-Brawler</title><path d="M17.552 6.25l-12.302 5.662 1.903 8.533h2.509l-0.433-6.104 0.385-0.116 1.509 6.22h2.607l-0.097-7.435 0.385-0.116 1.319 7.551h2.76l0.651-8.981 0.385-0.116 0.683 9.097h3.65l1.285-12.489-7.198-1.707z"></path><path d="M15.446 23.938l-0.91-2.283 8.773 0.439-0.376 3.656-7.487-1.812z"></path></svg>);
            case 4:
              return (<svg id="trait-Elementalist" viewBox="0 0 32 32"><title>trait-Elementalist</title><path d="M10.857 12.191c1.45-1.359 2.866-2.686 2.528-7.191 4.879 1.437 6.098 6.884 6.098 9.429 1.045-0.718 1.597-2.395 1.742-3.143 6.97 8.98-0.871 15.714-5.227 15.714s-9.824-4.738-7.405-11.674c0.526-1.507 1.401-2.327 2.263-3.136zM15.684 17.571c-0.29 0.748-0.871 1.347-2.178 2.693l-0 0c-0.974 1.004-0.436 4.041 2.178 4.041s3.049-2.694 2.178-4.041c-0.697-1.078-1.742-2.245-2.178-2.694z"></path></svg>);
            case 5:
              return (<svg id="trait-Guardian" viewBox="0 0 32 32"><title>trait-Guardian</title><path d="M16.168 4.761l0.398 13.601 0.933-12.45c1.735 1.276 4.559 2.735 7.427 2.735 0 4.404-2.070 14.379-8.758 19.043-6.688-4.664-8.758-14.638-8.758-19.043 3.822 0 7.564-2.591 8.758-3.886 0 0 0 0 0 0z"></path></svg>);
            case 6:
              return (<svg id="trait-Gunslinger" viewBox="0 0 32 32"><title>trait-Gunslinger</title><path d="M23.196 13.76l-10.698-6.449-1.426 2.15 6.775 4.657c-0.475 0.597-1.070 2.078 0.357 3.224s2.972 0.478 3.566 0c0.856 2.006-0.832 3.702-1.783 4.299l3.209 2.866c4.565-4.586 2.496-8.957 0-10.748z"></path><path d="M19.806 10.462l0.876-0.602c0.322-0.222 0.407-0.662 0.191-0.989l-0.658-0.992c-0.211-0.318-0.634-0.414-0.96-0.217l-2.046 1.233 2.598 1.566z"></path><path d="M12.491 11.738l-3.353 2.021c-2.407 1.727-4.416 5.853-0.464 10.257 0.253 0.282 0.685 0.294 0.967 0.042l1.995-1.781c0.356-0.318 0.309-0.896-0.035-1.226-0.855-0.818-1.691-2.173-1.036-3.709 0.594 0.478 2.14 1.146 3.566 0s0.832-2.627 0.357-3.224l0.733-0.504-2.729-1.876z"></path></svg>);
            case 7:
              return (<svg id="trait-Knight" viewBox="0 0 32 32"><title>trait-Knight</title><path d="M9.667 24.066v-1.967l6.333 2.361 6.333-2.361v1.967l-6.333 3.934-6.333-3.934z"></path><path d="M16 23.279l7-3.148v-6.689l-7-3.148-7 3.148v6.689l7 3.148zM10.333 15.017h1.333v3.934h-1.333v-3.934zM21.667 15.017v3.934h-1.333v-3.934h1.333zM13.667 14.229h1.333v5.508h-1.333v-5.508zM18.333 14.229v5.508h-1.333v-5.508h1.333z"></path><path d="M10.333 11.476c0.111-1.443 1.067-4.564 4-5.508v-1.967h3.667v1.967c2.933 0.944 3.889 4.066 4 5.508-2.133-1.889-4.667-2.361-5.667-2.361s-3.867 0.472-6 2.361z"></path></svg>);
            case 8:
              return (<svg id="trait-Ranger" viewBox="0 0 32 32"><title>trait-Ranger</title><path d="M4 18.618l10.452-9.615 0.387 0.401-6.968 7.612 13.936-5.208-1.548-1.602 7.742 0.801-5.419 5.609v-2.003l-14.323 4.006 9.677 4.006v0.401l-13.935-4.407z"></path><path d="M12.513 27c4.983-0.407 8.905-4.722 8.905-9.984 0-5.532-4.333-10.016-9.678-10.016-1.376 0-2.684 0.297-3.869 0.833 0.255-0.021 0.513-0.031 0.773-0.031 5.345 0 9.677 4.484 9.677 10.016 0 4.108-2.389 7.638-5.808 9.183z"></path></svg>);
            case 9:
              return (<svg id="trait-Shapeshifter" viewBox="0 0 32 32"><title>trait-Shapeshifter</title><path d="M12.25 16.222c-4.583-4.444-1.25-10.222 2.917-10.222v19.556h-9.167c0-6.4 4.167-8.889 6.25-9.333z"></path><path d="M19.228 16.573c4.124-3.999 1.065-8.934-2.395-8.934v-1.5c4.577 0 8.037 5.838 4.267 10.599 0.983 0.381 2.109 1.027 3.099 2.067 1.444 1.516 2.551 3.817 2.551 7.195h-1.5c0-3.021-0.977-4.943-2.137-6.16-1.176-1.235-2.591-1.797-3.52-1.995l-1.375-0.293 1.009-0.979z"></path></svg>);   
            case 10:
              return (<svg id="trait-Sorcerer" viewBox="0 0 32 32"><title>trait-Sorcerer</title><path d="M9.151 21.233v-14.233l6.226 3.349v14.233l-6.226-3.349z"></path><path d="M7.491 9.93l-2.491-1.256v15.070l7.472 1.256-4.981-2.512v-12.558z"></path><path d="M22.849 21.233v-14.233l-6.226 3.349v14.233l6.226-3.349z"></path><path d="M24.509 9.93l2.491-1.256v15.070l-7.472 1.256 4.981-2.512v-12.558z"></path></svg>);  
            default:
              return (<svg viewBox="0 0 32 32"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>);
}
}
