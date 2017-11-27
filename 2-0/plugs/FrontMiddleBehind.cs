using System;
using System.Collections;
using System.Diagnostics;
using Tekla.Structures.Model;

namespace Tekla.Technology.Akit.UserScript
{    
    public class Script
    {      
        public static void Run(Tekla.Technology.Akit.IScript akit)
        {
            try
            {
                new SwapHandles();
            }
            catch (Exception ex)
            {
                Trace.WriteLine(ex.Message + ex.StackTrace);
            }
        }      
    }

    public class SwapHandles
    {
        public SwapHandles()
        {            
            var selector = new Tekla.Structures.Model.UI.ModelObjectSelector();
            var myEnum = selector.GetSelectedObjects();
			
            while (myEnum.MoveNext())
            {
                if(myEnum.Current is Tekla.Structures.Model.ContourPlate)
                {				
                    ContourPlate cPlate = myEnum.Current as ContourPlate;
					cPlate.Position.Depth = SwapEndForces(cPlate.Position.Depth);					                   
                    cPlate.Modify(); 
				}	
                else if(myEnum.Current is Tekla.Structures.Model.BooleanPart)
                {				
				    BooleanPart boolPart = myEnum.Current as Tekla.Structures.Model.BooleanPart;
                    ContourPlate boolConturPlate = boolPart.OperativePart as Tekla.Structures.Model.ContourPlate;

                    if (boolConturPlate != null)
                    {                       
                        boolConturPlate.Position.Depth = SwapEndForces(boolConturPlate.Position.Depth);					                   
                        boolConturPlate.Modify();
                    }     
				}				
            }

            new Model().CommitChanges();
        }    

        private Position.DepthEnum SwapEndForces(Position.DepthEnum dEnum)
        {
            switch(dEnum)
                {
                    case Position.DepthEnum.BEHIND:
                        {
                            dEnum = Position.DepthEnum.FRONT;
                            break;
                        }
                    case Position.DepthEnum.FRONT:
                        {
                            dEnum = Position.DepthEnum.MIDDLE;
                            break;
                        }
                    default:
                        {
                            dEnum = Position.DepthEnum.BEHIND;
                            break;
                        }
                }
            return dEnum;
        }		
    }
}