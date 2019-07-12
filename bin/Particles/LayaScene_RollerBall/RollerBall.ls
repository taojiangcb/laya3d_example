{
	"type":"Scene",
	"props":{
		"name":"RollerBall",
		"enableFog":false,
		"fogStart":0,
		"fogRange":300
	},
	"customProps":{
		"skyBox":{},
		"lightmaps":[],
		"ambientColor":[
			0.4313726,
			0.4705882,
			0.5490196
		],
		"fogColor":[
			1,
			1,
			1
		]
	},
	"child":[
		{
			"type":"MeshSprite3D",
			"props":{
				"isStatic":false,
				"name":"RollerBall"
			},
			"customProps":{
				"layer":9,
				"translate":[
					30,
					0.5,
					25
				],
				"rotation":[
					0,
					0,
					0,
					-1
				],
				"scale":[
					1,
					1,
					1
				],
				"meshPath":"Assets/Standard Assets/Characters/RollerBall/Models/RollerBall-RollerBall.lm",
				"materials":[
					{
						"type":"Laya.StandardMaterial",
						"path":"Assets/Standard Assets/Characters/RollerBall/Materials/RollerBallGrey.lmat"
					}
				]
			},
			"components":{
				"SphereCollider":{
					"isTrigger":false,
					"center":[
						0,
						0,
						0
					],
					"radius":0.5
				},
				"Rigidbody":{}
			},
			"child":[]
		},
		{
			"type":"Sprite3D",
			"props":{
				"isStatic":false,
				"name":"Cameras"
			},
			"customProps":{
				"layer":0,
				"translate":[
					0,
					0,
					0
				],
				"rotation":[
					0,
					0,
					0,
					-1
				],
				"scale":[
					1,
					1,
					1
				]
			},
			"components":{},
			"child":[
				{
					"type":"Sprite3D",
					"props":{
						"isStatic":false,
						"name":"FreeLookCameraRig"
					},
					"customProps":{
						"layer":0,
						"translate":[
							30,
							0.5,
							25
						],
						"rotation":[
							0,
							1,
							0,
							1.629207E-07
						],
						"scale":[
							1,
							1,
							1
						]
					},
					"components":{
						"Rigidbody":{}
					},
					"child":[
						{
							"type":"Sprite3D",
							"props":{
								"isStatic":false,
								"name":"Pivot"
							},
							"customProps":{
								"layer":0,
								"translate":[
									0,
									1.5,
									-0.5
								],
								"rotation":[
									0,
									0,
									0,
									-1
								],
								"scale":[
									1,
									1,
									1
								]
							},
							"components":{},
							"child":[
								{
									"type":"Camera",
									"props":{
										"isStatic":false,
										"name":"MainCamera",
										"clearFlag":1,
										"orthographic":false,
										"fieldOfView":60,
										"nearPlane":0.02,
										"farPlane":400
									},
									"customProps":{
										"layer":0,
										"translate":[
											0,
											0.938,
											-3.2
										],
										"rotation":[
											0,
											0.9812414,
											0.192783,
											0
										],
										"scale":[
											1,
											1,
											1
										],
										"viewport":[
											0,
											0,
											1,
											1
										],
										"clearColor":[
											0.6255291,
											0.684092,
											0.7761194,
											0.01960784
										]
									},
									"components":{},
									"child":[]
								}
							]
						}
					]
				}
			]
		},
		{
			"type":"Sprite3D",
			"props":{
				"isStatic":true,
				"name":"GeometryStatic"
			},
			"customProps":{
				"layer":0,
				"translate":[
					0,
					0,
					0
				],
				"rotation":[
					0,
					0,
					0,
					-1
				],
				"scale":[
					1,
					1,
					1
				]
			},
			"components":{},
			"child":[
				{
					"type":"Sprite3D",
					"props":{
						"isStatic":true,
						"name":"GroundObstacles"
					},
					"customProps":{
						"layer":0,
						"translate":[
							0,
							0,
							0
						],
						"rotation":[
							0,
							0,
							0,
							-1
						],
						"scale":[
							1,
							1,
							1
						]
					},
					"components":{},
					"child":[
						{
							"type":"MeshSprite3D",
							"props":{
								"isStatic":true,
								"name":"GroundExtents"
							},
							"customProps":{
								"layer":0,
								"translate":[
									0,
									0,
									0
								],
								"rotation":[
									0,
									0,
									0,
									-1
								],
								"scale":[
									1,
									1,
									1
								],
								"meshPath":"Assets/SampleScenes/Models/GroundObstacles-GroundExtents.lm",
								"materials":[
									{
										"type":"Laya.StandardMaterial",
										"path":"Assets/SampleScenes/Materials/NavySmooth.lmat"
									},
									{
										"type":"Laya.StandardMaterial",
										"path":"Assets/SampleScenes/Materials/NavyGrid.lmat"
									},
									{
										"type":"Laya.StandardMaterial",
										"path":"Assets/SampleScenes/Materials/NavyDarkGrid.lmat"
									}
								]
							},
							"components":{},
							"child":[]
						},
						{
							"type":"MeshSprite3D",
							"props":{
								"isStatic":true,
								"name":"GroundLines"
							},
							"customProps":{
								"layer":0,
								"translate":[
									0,
									0,
									0
								],
								"rotation":[
									0,
									0,
									0,
									-1
								],
								"scale":[
									1,
									1,
									1
								],
								"meshPath":"Assets/SampleScenes/Models/GroundObstacles-GroundLines.lm",
								"materials":[
									{
										"type":"Laya.StandardMaterial",
										"path":"Assets/SampleScenes/Materials/WhiteSmooth.lmat"
									}
								]
							},
							"components":{},
							"child":[]
						},
						{
							"type":"MeshSprite3D",
							"props":{
								"isStatic":true,
								"name":"GroundObstacles"
							},
							"customProps":{
								"layer":0,
								"translate":[
									0,
									0,
									0
								],
								"rotation":[
									0,
									0,
									0,
									-1
								],
								"scale":[
									1,
									1,
									1
								],
								"meshPath":"Assets/SampleScenes/Models/GroundObstacles-GroundObstacles.lm",
								"materials":[
									{
										"type":"Laya.StandardMaterial",
										"path":"Assets/SampleScenes/Materials/WhiteSmooth.lmat"
									}
								]
							},
							"components":{},
							"child":[]
						}
					]
				}
			]
		},
		{
			"type":"Sprite3D",
			"props":{
				"isStatic":false,
				"name":"Lights"
			},
			"customProps":{
				"layer":0,
				"translate":[
					0,
					0,
					0
				],
				"rotation":[
					0,
					0,
					0,
					-1
				],
				"scale":[
					1,
					1,
					1
				]
			},
			"components":{},
			"child":[
				{
					"type":"DirectionLight",
					"props":{
						"isStatic":false,
						"name":"LightMainDirectional",
						"intensity":0.9,
						"lightmapBakedType":0
					},
					"customProps":{
						"layer":0,
						"translate":[
							0,
							10,
							0
						],
						"rotation":[
							0.2757653,
							0.3802936,
							0.1199061,
							-0.8746158
						],
						"scale":[
							1,
							1,
							1
						],
						"color":[
							1,
							1,
							1
						]
					},
					"components":{},
					"child":[]
				}
			]
		}
	]
}