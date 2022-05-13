import { ref, watch, reactive } from 'vue'

import dynamics from 'dynamics.js'

/*
For some reason, dynamics.js does not allow animating the cy attribute in svg element directly
(It results in the following error: "Cannot set property cx of #<SVGCircleElement> which has only a getter")
So, as a workaround, we let dynamics.js animate a reactive variable, which we watch, so
we can call "setAttribute" ourselves

Note: We are using a different (and clearer) signature than dynamics.animate()
*/
export function useDynamicsSVG() {

  interface AnimationProperties {
    element: any;              // The SVG element which has a property that should be animated
    propertyName: string;  // The name of the property that should be animated
    startValue: number;
    endValue: number;
    options: any;          // The options argument to pass to dynamics.js
  }

  function dynamicsAnimateSVG(obj:AnimationProperties) {

    let startObj:any = {}
    startObj[obj.propertyName] = obj.startValue

    let reactiveObject = reactive(startObj)
    watch(reactiveObject, (a:any) => {
      obj.element.setAttribute(obj.propertyName, a[obj.propertyName].toString())
    })

    let endObj:any = {}
    endObj[obj.propertyName] = obj.endValue

    dynamics.animate(
        reactiveObject,
        endObj,
        obj.options
    )
  }
  return {animateProperty: dynamicsAnimateSVG}
}
