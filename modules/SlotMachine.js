


	
	module.exports = class
	{
		items;
		constructor()
		{
			this.items = [
				['💵', '💍', '💯','🍒','7️⃣','🍀'],
				['💵', '💍', '💯','🍒','7️⃣','🍀'],
				['💵', '💍', '💯','🍒','7️⃣','🍀']];
		}

		Play()
		{

			let res = this.GetResults();

			var Results = {
				SlotsSlideShow : res.SlideShow,
				Won : this.WinningSymbols ? this.WinningSymbols.length > 0 : false  ,
				WinningSymbols : [],
				FinalBoard : res.FinalBoard,
			}

			var horiimzontalWinSymbols = this.HasHorizontalMatch(res.FinalBoard);
			var diagWinSymbols = this.HasDiagnalMatch(res.FinalBoard);
			
			Results.WinningSymbols = horizontalWinSymbols.concat(diagWinSymbols);

			return Results;
		}

		GetSymbolFromColumn(row)
		{
			var selection = Math.floor(this.items[row].length * Math.random());
			var emoji = this.items[row][selection];
			this.items[row].splice(selection,1);
			return emoji;
		}

		GetResults() 
		{

			let start = [
				['🤑','🤑', '🤑'],
				['🤑','🤑', '🤑'],
				['🤑','🤑', '🤑']
			];
			let slideShow = [];
			slideShow.push(this.BuildDisplay(JSON.parse(JSON.stringify(start))));
			for (let i = 0; i <= 2; i++) {
				for (let j = 0; j <= 2; j++) {
					start[i][j] = this.GetSymbolFromColumn(j);

					//Gotta do this json shit because we cant have the reference, otherwise the slideShow has all the elements of the final array, rather than a slide show of it displaying 
					slideShow.push(this.BuildDisplay(JSON.parse(JSON.stringify(start))));
				}
			}
			return {
				SlideShow : slideShow,
				FinalBoard : start
			};
		}

		BuildDisplay(results) {
			var resStr = "";
			for (let i = 0; i <= 2; i++) {
				resStr += "• " + results[i][0] + "  " + results[i][1] + "  " + results[i][2] + " •"
				resStr += "\n";
			}
		
			return resStr;
		}
		
		HasHorizontalMatch(results)
		{
			let winners = [];
			for(let i = 0; i <=2; i++)
			{
				
				if(results[i].every( x => x === results[i][0]))
				{
					winners.push(results[i][0])
				}
			}
			return winners;
		}
		
		HasVerticalMatch(results)
		{
			var newResult = results[0].map((col, i) => results.map(row => row[i]));
			return this.HasHorizontalMatch(newResult);
		}
		
		HasDiagnalMatch(results)
		{
			let winners = [];
			var topToBottomMatch = results[0][0] == results[1][1] && results[0][0] == results[2][2];
            var bottomToTopMatch = results[2][0] == results[1][1] && results[2][0] == results[0][2];
			
			if(topToBottomMatch)
			{
				winners.push(results[0][0]);
			}

			if(bottomToTopMatch)
			{
				winners.push(results[2][0]);
			}

			return winners;
		}
	
	}	