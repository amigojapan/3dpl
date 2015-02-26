// C#
using UnityEngine;
using System.Collections;
public class Item {
	public bool Selected;
	public string Content;
}

public class GUITest : MonoBehaviour {
    private Vector2 scrollPosition;

	void OnGUI () {
//		if (GUI.Button (new Rect (500,500,150,100), "I am a button")) {
//			print ("You clicked the button!");
//		}

//    GUIContent content = GUIContent("Test");
//    content.text = string.Empty;

/*            if (this.Style != null)
    {
        GUILayout.BeginArea(ControlRect, content, this.Style);
    }
    else
    {
        GUILayout.BeginArea(ControlRect, content);
    }
*/
    // desplegamos la lista en un area GUILayout
	GUILayout.BeginArea(new Rect(10,10,500,500));
				Item[] ListItems= new Item[3];
				ListItems[0].Content="Item 1";
				ListItems[1].Content="Item 2";
				ListItems[2].Content="Item 3";

                foreach (Item item in ListItems)
                {
					GUILayout.Button (item.Content);
				}
	
		//GUILayout.Button ("Click me");
    //GUILayout.Button ("Or me");
/*		
        GUILayout.BeginVertical();
        {
            this.scrollPosition = GUILayout.BeginScrollView(this.scrollPosition, GUILayout.Width(500), GUILayout.Height(500));
            {
					
				Item[] ListItems= new Item[3];
				ListItems[0].Content="Item 1";
				ListItems[1].Content="Item 2";
				ListItems[2].Content="Item 3";

                foreach (Item item in ListItems)
                {
                    GUILayout.BeginHorizontal();
					GUILayout.Button (item.Content);
                    bool selected;

                    switch (2)
                    {
                        case 1:
                            GUILayout.Toggle(item.Selected, item.Content);
                            break;
                        case 2://single select
                            selected = GUILayout.Toggle(item.Selected, item.Content);

                            if (selected != item.Selected)
                            {
                                item.Selected = selected;

                                if (item.Selected)
                                {
                                    item.Selected=false;
                                }

                                //RaiseEventSelectionChange(new SelectionChangeEventArgs(item));
                            }

                            break;

                        case 3://multiple select
                            selected = GUILayout.Toggle(item.Selected, item.Content);

                            if (selected != item.Selected)
                            {
                                item.Selected = selected;

                                //RaiseEventSelectionChange(new SelectionChangeEventArgs(item));
                            }

                            break;
                    }

                    GUILayout.EndHorizontal();
                }
            }

            GUILayout.EndScrollView();
        }

        GUILayout.EndVertical();
        */  
	GUILayout.EndArea();
       
	}
}
