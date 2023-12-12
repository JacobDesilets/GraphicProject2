let obj1 = {
    vertices: [
        // Table surface
        vec4(-1.8, .2, -1.0, 1),    // p0
        vec4(-1.8, -.01, -1.0, 1),   // p1
        vec4(1.8, -.01, -1.0, 1),    // p2
        vec4(1.8, .2, -1.0, 1),     // p3
        vec4(1.8, .2, 1.0, 1),    // p4
        vec4(-1.8, .2, 1.0, 1),   // p5
        vec4(-1.8, -.01, 1.0, 1),  // p6
        vec4(1.8, -.01, 1.0, 1),   // p7
        // leg
        vec4(-0.1, -0.01, -0.1, 1), // p8
        vec4(-0.1, -1.7, -0.1, 1), // p9
        vec4(0.1, -1.7, -0.1, 1),  // p10
        vec4(0.1, -0.01, -0.1, 1),  // p11
        vec4(0.1, -0.01, 0.1, 1),   // p12
        vec4(-0.1, -0.01, 0.1, 1),  // p13
        vec4(-0.1, -1.7, 0.1, 1),  // p14
        vec4(0.1, -1.7, 0.1, 1),   // p15
    ],
    indexList: [
        0, 1, 3,
        1, 2, 3,
        6, 5, 7,
        4, 7, 5,
        0, 6, 1,
        5, 6, 0,
        2, 4, 3,
        2, 7, 4,
        0, 4, 5,
        0, 3, 4,
        2, 1, 6,
        2, 6, 7,

        8, 9, 11,
        9, 10, 11,
        14, 13, 15,
        12, 15, 13,
        8, 14, 9,
        13, 14, 8,
        10, 12, 11,
        10, 15, 12,
        8, 12, 13,
        8, 11, 12,
        10, 9, 14,
        10, 14, 15,
    ],
    texCoords: [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ],
};

let obj2 = {
    vertices: [
        vec4(-0.7, 0.9, -0.3, 1),  // p0
        vec4(-0.7, 0.3, -0.3, 1),   // p1
        vec4(-0.1, 0.3, -0.3, 1),    // p2
        vec4(-0.1, 0.9, -0.3, 1),   // p3
        vec4(-0.1, 0.9, 0.3, 1),    // p4
        vec4(-0.7, 0.9, 0.3, 1),   // p5
        vec4(-0.7, 0.3, 0.3, 1),    // p6
        vec4(-0.1, 0.3, 0.3, 1)      // p7
    ],
    indexList: [
        0, 1, 3,
        1, 2, 3,
        6, 5, 7,
        4, 7, 5,
        0, 6, 1,
        5, 6, 0,
        2, 4, 3,
        2, 7, 4,
        0, 4, 5,
        0, 3, 4,
        2, 1, 6,
        2, 6, 7,
    ],
    texCoords: [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ],
}

// used this python script in Blender to export a model's vertices and index list for use here

// import bpy, bmesh
// obj = bpy.context.active_object

// if obj.mode == 'EDIT':
//     # this works only in edit mode,
//     bm = bmesh.from_edit_mesh(obj.data)
//     verts = [vert.co for vert in bm.verts]

// else:
//     # this works only in object mode,
//     verts = [vert.co for vert in obj.data.vertices]

// # coordinates as tuples
// output = ""
// for vert in verts:
//     output += f'vec4({vert.to_tuple()[0]:.4f}, {vert.to_tuple()[1]:.4f}, {vert.to_tuple()[2]:.4f}, 1.0),\n'

// print(output)

// output2 = ""
// vert_idx = []
// for f in obj.data.polygons:
//     output2 += f'{f.vertices[0]}, {f.vertices[1]}, {f.vertices[2]},\n'
    
// print(output2)

let obj3 = {
    vertices: [
        vec4(0.0000, 0.0665, -0.0493, 1.0),
        vec4(0.0239, 0.0665, -0.0446, 1.0),
        vec4(0.0442, 0.0665, -0.0310, 1.0),
        vec4(0.0577, 0.0665, -0.0107, 1.0),
        vec4(0.0625, 0.0665, 0.0132, 1.0),
        vec4(0.0577, 0.0665, 0.0371, 1.0),
        vec4(0.0442, 0.0665, 0.0574, 1.0),
        vec4(0.0239, 0.0665, 0.0709, 1.0),
        vec4(-0.0000, 0.0665, 0.0757, 1.0),
        vec4(-0.0239, 0.0665, 0.0709, 1.0),
        vec4(-0.0442, 0.0665, 0.0574, 1.0),
        vec4(-0.0577, 0.0665, 0.0371, 1.0),
        vec4(-0.0625, 0.0665, 0.0132, 1.0),
        vec4(-0.0577, 0.0665, -0.0107, 1.0),
        vec4(-0.0442, 0.0665, -0.0310, 1.0),
        vec4(-0.0239, 0.0665, -0.0446, 1.0),
        vec4(-0.0000, 0.4224, 0.0088, 1.0),
        vec4(-0.0003, 0.4343, 0.0118, 1.0),
        vec4(0.0031, 0.4224, 0.0101, 1.0),
        vec4(0.0027, 0.4344, 0.0133, 1.0),
        vec4(0.0044, 0.4224, 0.0132, 1.0),
        vec4(0.0038, 0.4348, 0.0164, 1.0),
        vec4(0.0031, 0.4224, 0.0163, 1.0),
        vec4(0.0024, 0.4352, 0.0194, 1.0),
        vec4(-0.0000, 0.4224, 0.0176, 1.0),
        vec4(-0.0008, 0.4354, 0.0204, 1.0),
        vec4(-0.0031, 0.4224, 0.0163, 1.0),
        vec4(-0.0039, 0.4353, 0.0190, 1.0),
        vec4(-0.0044, 0.4224, 0.0132, 1.0),
        vec4(-0.0050, 0.4349, 0.0158, 1.0),
        vec4(-0.0031, 0.4224, 0.0101, 1.0),
        vec4(-0.0035, 0.4345, 0.0128, 1.0),
        vec4(-0.0000, 0.4234, -0.0181, 1.0),
        vec4(0.0000, 0.3967, -0.0293, 1.0),
        vec4(-0.0000, 0.4198, -0.0231, 1.0),
        vec4(0.0000, 0.4101, -0.0272, 1.0),
        vec4(0.0120, 0.4234, -0.0157, 1.0),
        vec4(0.0163, 0.3967, -0.0261, 1.0),
        vec4(0.0139, 0.4198, -0.0203, 1.0),
        vec4(0.0155, 0.4101, -0.0242, 1.0),
        vec4(0.0221, 0.4234, -0.0089, 1.0),
        vec4(0.0301, 0.3967, -0.0169, 1.0),
        vec4(0.0257, 0.4198, -0.0125, 1.0),
        vec4(0.0286, 0.4101, -0.0154, 1.0),
        vec4(0.0289, 0.4234, 0.0012, 1.0),
        vec4(0.0393, 0.3967, -0.0031, 1.0),
        vec4(0.0335, 0.4198, -0.0007, 1.0),
        vec4(0.0373, 0.4101, -0.0023, 1.0),
        vec4(0.0312, 0.4234, 0.0132, 1.0),
        vec4(0.0425, 0.3967, 0.0132, 1.0),
        vec4(0.0363, 0.4198, 0.0132, 1.0),
        vec4(0.0404, 0.4101, 0.0132, 1.0),
        vec4(0.0289, 0.4234, 0.0251, 1.0),
        vec4(0.0393, 0.3967, 0.0294, 1.0),
        vec4(0.0335, 0.4198, 0.0271, 1.0),
        vec4(0.0373, 0.4101, 0.0286, 1.0),
        vec4(0.0221, 0.4234, 0.0353, 1.0),
        vec4(0.0301, 0.3967, 0.0432, 1.0),
        vec4(0.0257, 0.4198, 0.0388, 1.0),
        vec4(0.0286, 0.4101, 0.0417, 1.0),
        vec4(0.0120, 0.4234, 0.0420, 1.0),
        vec4(0.0163, 0.3967, 0.0524, 1.0),
        vec4(0.0139, 0.4198, 0.0467, 1.0),
        vec4(0.0155, 0.4101, 0.0505, 1.0),
        vec4(-0.0000, 0.4234, 0.0444, 1.0),
        vec4(-0.0000, 0.3967, 0.0557, 1.0),
        vec4(-0.0000, 0.4198, 0.0494, 1.0),
        vec4(-0.0000, 0.4101, 0.0536, 1.0),
        vec4(-0.0120, 0.4234, 0.0420, 1.0),
        vec4(-0.0163, 0.3967, 0.0524, 1.0),
        vec4(-0.0139, 0.4198, 0.0467, 1.0),
        vec4(-0.0155, 0.4101, 0.0505, 1.0),
        vec4(-0.0221, 0.4234, 0.0353, 1.0),
        vec4(-0.0301, 0.3967, 0.0432, 1.0),
        vec4(-0.0257, 0.4198, 0.0388, 1.0),
        vec4(-0.0286, 0.4101, 0.0417, 1.0),
        vec4(-0.0289, 0.4234, 0.0251, 1.0),
        vec4(-0.0393, 0.3967, 0.0294, 1.0),
        vec4(-0.0335, 0.4198, 0.0271, 1.0),
        vec4(-0.0373, 0.4101, 0.0286, 1.0),
        vec4(-0.0312, 0.4234, 0.0132, 1.0),
        vec4(-0.0425, 0.3967, 0.0132, 1.0),
        vec4(-0.0363, 0.4198, 0.0132, 1.0),
        vec4(-0.0404, 0.4101, 0.0132, 1.0),
        vec4(-0.0289, 0.4234, 0.0012, 1.0),
        vec4(-0.0393, 0.3967, -0.0031, 1.0),
        vec4(-0.0335, 0.4198, -0.0007, 1.0),
        vec4(-0.0373, 0.4101, -0.0023, 1.0),
        vec4(-0.0221, 0.4234, -0.0089, 1.0),
        vec4(-0.0301, 0.3967, -0.0169, 1.0),
        vec4(-0.0257, 0.4198, -0.0125, 1.0),
        vec4(-0.0286, 0.4101, -0.0154, 1.0),
        vec4(-0.0120, 0.4234, -0.0157, 1.0),
        vec4(-0.0163, 0.3967, -0.0261, 1.0),
        vec4(-0.0139, 0.4198, -0.0203, 1.0),
        vec4(-0.0155, 0.4101, -0.0242, 1.0),
        vec4(0.0000, 0.4234, 0.0132, 1.0),
        vec4(-0.0006, 0.4348, 0.0161, 1.0),
        vec4(0.0414, 0.0665, -0.0051, 1.0),
        vec4(0.0137, 0.0665, -0.0200, 1.0),
        vec4(-0.0163, 0.0665, -0.0291, 1.0),
        vec4(0.0312, 0.0665, 0.0261, 1.0),
        vec4(0.0000, 0.0665, 0.0132, 1.0),
        vec4(-0.0312, 0.0665, 0.0002, 1.0),
        vec4(0.0163, 0.0665, 0.0554, 1.0),
        vec4(-0.0137, 0.0665, 0.0463, 1.0),
        vec4(-0.0414, 0.0665, 0.0315, 1.0),
        vec4(-0.0000, 0.4224, 0.0132, 1.0),
        vec4(0.0058, 0.2386, -0.0362, 1.0),
        vec4(0.0248, 0.2410, -0.0325, 1.0),
        vec4(-0.0129, 0.2351, -0.0324, 1.0),
        vec4(0.0410, 0.2420, -0.0218, 1.0),
        vec4(0.0521, 0.2414, -0.0058, 1.0),
        vec4(0.0563, 0.2393, 0.0131, 1.0),
        vec4(0.0529, 0.2361, 0.0320, 1.0),
        vec4(0.0426, 0.2321, 0.0480, 1.0),
        vec4(0.0269, 0.2281, 0.0587, 1.0),
        vec4(0.0081, 0.2247, 0.0625, 1.0),
        vec4(-0.0108, 0.2223, 0.0588, 1.0),
        vec4(-0.0270, 0.2213, 0.0481, 1.0),
        vec4(-0.0381, 0.2219, 0.0321, 1.0),
        vec4(-0.0423, 0.2240, 0.0132, 1.0),
        vec4(-0.0390, 0.2272, -0.0057, 1.0),
        vec4(-0.0287, 0.2311, -0.0217, 1.0),
    ],
    indexList: [
        93, 108, 110,
111, 45, 112,
112, 49, 113,
113, 53, 114,
114, 57, 115,
115, 61, 116,
116, 65, 117,
117, 69, 118,
69, 119, 118,
73, 120, 119,
77, 121, 120,
81, 122, 121,
85, 123, 122,
89, 110, 123,
33, 109, 108,
109, 41, 111,
19, 17, 97,
17, 18, 16,
19, 20, 18,
21, 22, 20,
23, 24, 22,
24, 27, 26,
26, 29, 28,
28, 31, 30,
30, 17, 16,
33, 39, 37,
35, 38, 39,
38, 32, 36,
37, 43, 41,
43, 38, 42,
42, 36, 40,
41, 47, 45,
47, 42, 46,
42, 44, 46,
45, 51, 49,
51, 46, 50,
46, 48, 50,
49, 55, 53,
55, 50, 54,
54, 48, 52,
57, 55, 59,
55, 58, 59,
58, 52, 56,
61, 59, 63,
59, 62, 63,
58, 60, 62,
61, 67, 65,
63, 66, 67,
62, 64, 66,
65, 71, 69,
71, 66, 70,
70, 64, 68,
69, 75, 73,
75, 70, 74,
70, 72, 74,
73, 79, 77,
79, 74, 78,
74, 76, 78,
77, 83, 81,
79, 82, 83,
78, 80, 82,
81, 87, 85,
83, 86, 87,
86, 80, 84,
89, 87, 91,
87, 90, 91,
86, 88, 90,
93, 91, 95,
95, 90, 94,
90, 92, 94,
93, 35, 33,
95, 34, 35,
34, 92, 32,
17, 31, 97,
36, 32, 96,
32, 92, 96,
92, 88, 96,
88, 84, 96,
84, 80, 96,
80, 76, 96,
76, 72, 96,
72, 68, 96,
68, 64, 96,
64, 60, 96,
60, 56, 96,
56, 52, 96,
52, 48, 96,
48, 44, 96,
44, 40, 96,
40, 36, 96,
31, 29, 97,
29, 27, 97,
27, 25, 97,
25, 23, 97,
23, 21, 97,
21, 19, 97,
3, 98, 2,
4, 101, 98,
6, 101, 5,
7, 104, 6,
2, 99, 1,
98, 102, 99,
104, 102, 101,
8, 105, 104,
99, 0, 1,
102, 100, 99,
102, 106, 103,
105, 10, 106,
100, 15, 0,
103, 14, 100,
103, 12, 13,
106, 11, 12,
22, 107, 20,
26, 107, 24,
107, 18, 20,
107, 30, 16,
109, 2, 1,
108, 1, 0,
123, 15, 14,
122, 14, 13,
121, 13, 12,
120, 12, 11,
10, 120, 11,
9, 119, 10,
8, 118, 9,
7, 117, 8,
6, 116, 7,
5, 115, 6,
4, 114, 5,
3, 113, 4,
111, 3, 2,
110, 0, 15,
93, 33, 108,
111, 41, 45,
112, 45, 49,
113, 49, 53,
114, 53, 57,
115, 57, 61,
116, 61, 65,
117, 65, 69,
69, 73, 119,
73, 77, 120,
77, 81, 121,
81, 85, 122,
85, 89, 123,
89, 93, 110,
33, 37, 109,
109, 37, 41,
17, 19, 18,
19, 21, 20,
21, 23, 22,
23, 25, 24,
24, 25, 27,
26, 27, 29,
28, 29, 31,
30, 31, 17,
33, 35, 39,
35, 34, 38,
38, 34, 32,
37, 39, 43,
43, 39, 38,
42, 38, 36,
41, 43, 47,
47, 43, 42,
42, 40, 44,
45, 47, 51,
51, 47, 46,
46, 44, 48,
49, 51, 55,
55, 51, 50,
54, 50, 48,
57, 53, 55,
55, 54, 58,
58, 54, 52,
61, 57, 59,
59, 58, 62,
58, 56, 60,
61, 63, 67,
63, 62, 66,
62, 60, 64,
65, 67, 71,
71, 67, 66,
70, 66, 64,
69, 71, 75,
75, 71, 70,
70, 68, 72,
73, 75, 79,
79, 75, 74,
74, 72, 76,
77, 79, 83,
79, 78, 82,
78, 76, 80,
81, 83, 87,
83, 82, 86,
86, 82, 80,
89, 85, 87,
87, 86, 90,
86, 84, 88,
93, 89, 91,
95, 91, 90,
90, 88, 92,
93, 95, 35,
95, 94, 34,
34, 94, 92,
3, 4, 98,
4, 5, 101,
6, 104, 101,
7, 8, 104,
2, 98, 99,
98, 101, 102,
104, 105, 102,
8, 9, 105,
99, 100, 0,
102, 103, 100,
102, 105, 106,
105, 9, 10,
100, 14, 15,
103, 13, 14,
103, 106, 12,
106, 10, 11,
22, 24, 107,
26, 28, 107,
107, 16, 18,
107, 28, 30,
109, 111, 2,
108, 109, 1,
123, 110, 15,
122, 123, 14,
121, 122, 13,
120, 121, 12,
10, 119, 120,
9, 118, 119,
8, 117, 118,
7, 116, 117,
6, 115, 116,
5, 114, 115,
4, 113, 114,
3, 112, 113,
111, 112, 3,
110, 108, 0,
    ],
  texCoords: [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ],

}