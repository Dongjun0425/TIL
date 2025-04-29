import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const  MyApp({super.key});



  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(

        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home:MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  MyHomePage({super.key});


  final items = List.generate(100, (i) => i).toList();
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(title:Text("제목"),),

      body : GridView.count(
          crossAxisCount: 2,
          children: [
            Container(
                color:Colors.red,
                width: 100,
                height: 100
            ),GridView.count(
              crossAxisCount: 2,
              children: [
                Container(
                    color:Colors.blue
                ),Container(
                    color:Colors.blue
                )
                ,Container(
                  color: Colors.black,
                ),
                Container(
                    color: Colors.orange
                )],),
            Container(
              color:Colors.yellow,
            ),Container(
              color: Colors.yellow,
            )]
      ),




    );
  }
}
